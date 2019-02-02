import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventStreamService {

  events: Subject<any>;
  private eventSource: EventSource;

  constructor(private zone: NgZone) {
    this.events = new Subject<any>();
  }

  onConnection(): any {
    if(!this.eventSource) {
      this.eventSource = new EventSource('/api/tictactoe');
      this.eventSource.onmessage = (event) => {
        this.zone.run(() => {
          this.events.next(JSON.parse(event.data));
        });
      };
    }
  }
}
