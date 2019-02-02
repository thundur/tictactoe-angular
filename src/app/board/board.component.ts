import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActionService } from '../events/action.service';
import { EventStreamService } from '../events/event-stream.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, OnDestroy {

  @Input()
  me: string;

  @Input()
  set turn(turn: string) {
    this.myTurn = this.me === turn;
    this.theTurn = turn;
  }

  myTurn: boolean;
  theTurn: string;

  @Input()
  players: {};

  @Input()
  set board(board: string[][]) {
    for(let i = 0; i < board.length; i++) {
      for(let j = 0; j < board[i].length; j++) {
        this.myBoard[i][j].symbol = board[i][j];
        this.myBoard[i][j].available = board[i][j] == '';
      }
    }
  };

  myBoard: any[][] = [[{}, {}, {}], [{}, {}, {}], [{}, {}, {}]];

  @Output()
  onSynchronize: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  onReset: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  onWin: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  onDraw: EventEmitter<void> = new EventEmitter<void>();

  private subscription: Subscription;

  constructor(private actionService: ActionService,
              private eventStreamService: EventStreamService) {
  }

  ngOnInit() {
    this.eventStreamService.events.subscribe((event) => {
      switch(event.type) {
        case 'move':
          this.myBoard[event.x][event.y] = {symbol: event.player, available: false};
          break;
        case 'win':
          this.onWin.emit(event.winner);
          break;
        case 'draw':
          this.onDraw.emit();
          break;
      }
    });
  }

  onCellClicked(row, column) {
    for(let i = 0; i < this.myBoard.length; i++) {
      for(let j = 0; j < this.myBoard[i].length; j++) {
        if(this.myBoard[i][j].available) {
          this.myBoard[i][j].symbol = '';
        }
      }
    }
    if(this.myBoard[row][column].available) {
      this.myBoard[row][column].symbol = this.theTurn;
    }
  }

  send() {
    for(let i = 0; i < this.myBoard.length; i++) {
      for(let j = 0; j < this.myBoard[i].length; j++) {
        if(this.myBoard[i][j].available && this.myBoard[i][j].symbol) {
          this.actionService.play(i, j).subscribe(() => {
          });
          break;
        }
      }
    }
  }

  reset() {
    this.onReset.emit();
  }

  synchronize() {
    this.onSynchronize.emit();
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
