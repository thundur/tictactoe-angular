import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-win',
  templateUrl: './win.component.html',
  styleUrls: ['./win.component.css']
})
export class WinComponent {

  @Input()
  winner: string;

  @Output()
  onReset = new EventEmitter<void>();

  constructor() { }

  restart() {
    this.onReset.emit();
  }

}
