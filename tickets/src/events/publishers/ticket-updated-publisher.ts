import { Publisher, Subjects, TicketUpdatedEvent } from '@oscompany/common'

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated
}
