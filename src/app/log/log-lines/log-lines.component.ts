import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-log-lines',
  templateUrl: './log-lines.component.html',
  styleUrls: ['./log-lines.component.css']
})
export class LogLinesComponent implements OnInit {

  @Input()
  lines: string[];

  constructor() {
  }

  ngOnInit() {
  }

}
