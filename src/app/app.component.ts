import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActionService } from './events/action.service';
import { EventStreamService } from './events/event-stream.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  mySymbol: string;
  turn: string;
  players: {};
  board: string[][];
  subscription: Subscription;
  gameEnded: boolean;
  winner: string;

  constructor(private eventStreamService: EventStreamService,
              private actionService: ActionService) {
  }

  ngOnInit(): void {
    this.synchronize();
    this.subscription = this.eventStreamService.events.subscribe((event) => {
      switch(event.type) {
        case 'turn':
          this.turn = event.player;
          break;
        case 'join':
          this.players[event.player] = event.name;
          break;
        case 'leave':
          delete this.players[event.player];
          break;
        case 'reset':
          this.board = [['','',''],['','',''],['','','']];
          this.turn = 'x';
          break;
      }
    });
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
      this.eventStreamService.onConnection();
    });
  }

  onLoggedIn(data: { symbol: string, username: string }) {
    this.synchronize();
  }

  loggedOff() {
    this.players = {};
    this.turn = '';
    this.mySymbol = '';
  }

  gameWon(winner: string) {
    this.gameEnded = true;
    this.winner = winner;
  }

  gameDraw() {
    this.gameEnded = true;
  }

  reset() {
    this.actionService.reset().subscribe(() => {
      console.log('Game was reset');
    });
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
