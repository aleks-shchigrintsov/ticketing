import { Publisher, PaymentCreatedEvent, Subjects } from '@oscompany/common'

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated
}
