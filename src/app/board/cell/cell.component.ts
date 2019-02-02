import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent {

  @Input()
  symbol: string;

  @Input()
  disabled: boolean;

  @Output()
  clicked: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  cellClicked() {
    this.clicked.emit();
  }

}
