import { Injectable } from '@angular/core';
import { Client, StompSubscription } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient: Client;
  private validatedValueSubscription: StompSubscription | null = null;
  private voteStartSubject: Subject<void> = new Subject<void>();
  private issueTitleSubject: Subject<string> = new Subject<string>();

  constructor() {
    this.stompClient = new Client();
    this.connect();
  }

  sendVoteStart(): void {
    if (this.stompClient.connected) {
      this.stompClient.publish({
        destination: '/app/vote-start',
        body: JSON.stringify({})
      });
      console.log('Vote start message sent');
    } else {
      console.error('WebSocket is not connected');
    }
  }

  sendIssueTitle(title: string): void {
    if (this.stompClient.connected) {
      this.stompClient.publish({
        destination: '/app/send-issue-title',
        body: title
      });
      console.log('Issue title sent:', title);
    } else {
      console.error('WebSocket is not connected');
    }
  }

  onVoteStart(): Observable<void> {
    return this.voteStartSubject.asObservable();
  }

  onIssueTitle(): Observable<string> {
    return this.issueTitleSubject.asObservable();
  }

  private connect() {
    this.stompClient.webSocketFactory = () => {
      return new SockJS('http://localhost:8081/pages/ws');
    };

    this.stompClient.onConnect = (frame) => {
      console.log('Connected: ' + frame);

      // Subscribe to vote start topic
      this.stompClient.subscribe('/topic/voteStart', (message) => {
        if (message.body) {
          console.log('Received vote start message:', message.body);
          this.voteStartSubject.next();
        }
      });

      // Subscribe to issue title topic
      this.stompClient.subscribe('/topic/issueTitle', (message) => {
        if (message.body) {
          console.log('Received issue title khalil:', message.body);
          this.issueTitleSubject.next(message.body);
        }
      });

      // Subscribe to validated choices
      this.validatedValueSubscription = this.stompClient.subscribe('/topic/validatedChoice', (message) => {
        if (message.body) {
          console.log('Received validated choice:', message.body);
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
      console.log('Validated choice sent:', value);
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
