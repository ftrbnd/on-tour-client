import { Component, input } from '@angular/core';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-error-message',
  imports: [MessageModule],
  templateUrl: './error-message.html',
})
export class ErrorMessage {
  error = input.required<string>();

  displayError() {
    if (this.error().includes('Http failure response')) {
      return 'The server failed to respond.';
    }

    return this.error();
  }
}
