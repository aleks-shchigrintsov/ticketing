import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import {
  NotFoundError,
  requireAuth,
  validateRequest,
  OrderStatus,
  BadRequestError,
} from '@oscompany/common'
import { body } from 'express-validator'

import { Order } from '../models/order'
import { Ticket } from '../models/ticket'
import { OrderCreatedPublisher } from '../events/publishers/order-created-publisher'
import { natsWrapper } from '../nats-wrapper'

const router = express.Router()

const EXPIRATION_WINDOW_SECONDS = 15 * 60

router.post(
  '/api/orders/',
  requireAuth,
  [
    body('ticketId')
      .not()
      .isEmpty()
      .custom(mongoose.Types.ObjectId.isValid)
      .withMessage('TicketId must be provided'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.body.ticketId)

    if (!ticket) {
      throw new NotFoundError()
    }

    // Find order without canceled status (reserved)
    const isReserved = await ticket.isReserved()

    if (isReserved) {
      throw new BadRequestError('Ticket is already reserved')
    }

    const expiration = new Date()
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS)

    const order = Order.build({
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expiresAt: expiration,
      ticket,
    })

    await order.save()

    new OrderCreatedPublisher(natsWrapper.client).publish({
      id: order.id,
      version: order.version,
      status: order.status,
      userId: order.userId,
      expiresAt: order.expiresAt.toISOString(),
      ticket: {
        id: ticket.id,
        price: ticket.price,
      },
    })

    res.status(201).send(order)
  }
)

export { router as newOrderRouter }
