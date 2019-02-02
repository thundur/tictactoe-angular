import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.css']
})
export class DrawComponent {

  constructor() { }

  @Output()
  onReset = new EventEmitter<void>();

  restart() {
    this.onReset.emit();
  }

}
