import { Publisher, Subjects, TicketCreatedEvent } from '@oscompany/common'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated
}
