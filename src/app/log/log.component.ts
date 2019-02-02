import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventStreamService } from '../events/event-stream.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit, OnDestroy {

  logLines: string[] = [];
  private subscription: Subscription;

  constructor(private eventStreamService: EventStreamService) {
  }

  ngOnInit(): void {
    this.subscription = this.eventStreamService.events.subscribe((event) => {
      this.logLines.push(JSON.stringify(event));
    });
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
