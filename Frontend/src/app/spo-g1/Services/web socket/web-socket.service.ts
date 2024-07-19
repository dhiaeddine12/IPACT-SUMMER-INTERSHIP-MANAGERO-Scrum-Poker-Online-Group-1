import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private client: any;
  private wsUrl = 'http://localhost:8090/pages/ws'; // URL du WebSocket
  private connected: boolean = false;

  constructor() {
    this.client = Stomp.over(new SockJS(this.wsUrl));

    this.client.connect({}, (frame: any) => {
      console.log('Connected: ' + frame);
      this.connected = true;
    }, (error: any) => {
      console.error('Connection error: ', error);
    });
  }

  public getLastClickedValue(): Observable<number> {
    return new Observable(observer => {
      this.client.connect({}, () => {
        this.client.subscribe('/topic/lastClickedValue', (message: any) => {
          if (message.body) {
            const value = JSON.parse(message.body);
            console.log('Received last clicked value: ', value);
            observer.next(value);
          }
        });
      });
    });
  }

  public sendLastClickedValue(value: number): void {
    this.client.publish({
      destination: '/app/lastClickedValue',
      body: JSON.stringify(value),
    });
  }
}
