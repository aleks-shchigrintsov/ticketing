import { Publisher, Subjects, OrderCreatedEvent } from '@oscompany/common'

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated
}
