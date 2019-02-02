import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { ActionService } from '../events/action.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @Output()
  loggedIn: EventEmitter<{ symbol: string, username: string }>;

  @ViewChild('username')
  username: ElementRef;

  constructor(private actionService: ActionService) {
    this.loggedIn = new EventEmitter<{ symbol: string, username: string }>();
  }

  onUsernameSet() {
    this.actionService.logon(this.username.nativeElement.value).subscribe((data: { symbol: string, username: string }) => {
      this.loggedIn.emit(data);
    });
  }

}
