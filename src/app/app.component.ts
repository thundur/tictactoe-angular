import { Component, OnInit } from '@angular/core';
import { ActionService } from './events/action.service';
import { EventStreamService } from './events/event-stream.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  mySymbol: string;
  turn: string;
  players: {};
  board: string[][];

  constructor(private eventStreamService: EventStreamService,
              private actionService: ActionService) {
  }

  ngOnInit(): void {
    this.synchronize();
  }

  isLoggedIn(): boolean {
    return !!this.mySymbol;
  }

  synchronize() {
    this.actionService.synchronize().subscribe((data) => {
      this.players = data.players;
      this.mySymbol = data.me;
      this.turn = data.turn;
      this.board = data.board;
    });
  }

  onLoggedIn(data: { symbol: string, username: string }) {
    this.eventStreamService.onConnection();
    this.synchronize();
  }

  loggedOff() {
    this.players = {};
    this.turn = '';
    this.mySymbol = '';
  }
}
