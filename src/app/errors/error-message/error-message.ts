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
    console.log(this.error());
    if (this.error().includes('Unknown failure')) {
      return 'The server failed to respond.';
    } else if (this.error().includes('401')) {
      return 'Please sign in to continue.';
    }

    return this.error();
  }
}
