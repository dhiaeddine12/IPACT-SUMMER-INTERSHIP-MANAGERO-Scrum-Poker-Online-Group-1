import { Injectable } from '@angular/core';
import { Client, StompSubscription } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient: Client;
  private validatedValueSubscription: StompSubscription | null = null;

  constructor() {
    this.stompClient = new Client();
    this.connect();
  }

  private connect() {
    this.stompClient.webSocketFactory = () => {
      return new SockJS('http://localhost:8081/pages/ws');
    };

    this.stompClient.onConnect = (frame) => {
      console.log('Connected: ' + frame);

      // Subscribe to the topic to receive validated choices
      this.validatedValueSubscription = this.stompClient.subscribe('/topic/validatedChoice', (message) => {
        if (message.body) {
          console.log('Received validated choice: ' + message.body);
          // Handle the received validated choice
        }
      });
    };

    this.stompClient.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    this.stompClient.activate();
  }

  public sendValidatedChoice(value: number) {
    if (this.stompClient.connected) {
      this.stompClient.publish({
        destination: '/app/validate',
        body: value.toString()
      });
    } else {
      console.error('Unable to send message. The WebSocket connection is not established.');
    }
  }

  public subscribeToValidatedValue(callback: (value: number) => void) {
    if (this.validatedValueSubscription) {
      this.validatedValueSubscription.unsubscribe();
    }

    this.validatedValueSubscription = this.stompClient.subscribe('/topic/validatedChoice', (message) => {
      if (message.body) {
        callback(Number(message.body));
      }
    });
  }

  disconnect() {
    if (this.stompClient.connected) {
      this.stompClient.deactivate();
      console.log('Disconnected');
    }
  }
}
