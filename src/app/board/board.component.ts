import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionService } from '../events/action.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @Input()
  me: string;

  @Input()
  turn: string;

  @Input()
  players: {};

  @Input()
  board: string[][];

  @Output()
  logout: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  onSynchronize: EventEmitter<void> = new EventEmitter<void>();

  constructor(private actionService: ActionService) {
  }

  ngOnInit() {
  }

  onLogoffClicked() {
    this.actionService.logoff().subscribe(_ => {
      this.logout.emit();
    });
  }

  send() {

  }

  reset() {

  }

  synchronize() {
    this.onSynchronize.emit();
  }

}
