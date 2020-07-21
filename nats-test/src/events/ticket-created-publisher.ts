import { TicketCreatedEvent, Publisher, Subjects } from '@oscompany/common'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated
}
