import { Publisher, Subjects, OrderCancelledEvent } from '@oscompany/common'

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled
}
