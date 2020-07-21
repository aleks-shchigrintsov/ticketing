import { Subjects, Publisher, ExpirationCompleteEvent } from '@oscompany/common'

export class ExpirationCompletePublisher extends Publisher<
  ExpirationCompleteEvent
> {
  readonly subject = Subjects.ExpirationComplete
}
