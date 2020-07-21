import { Message } from 'node-nats-streaming'
import { Listener, TicketCreatedEvent } from '@oscompany/common'
import { Subjects } from '../../../common/src/events/subjects'

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated
  queueGroupName = 'payments-service'

  onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    console.log('Event data!', data)

    console.log(data.id)
    console.log(data.title)
    console.log(data.price)

    msg.ack()
  }
}
