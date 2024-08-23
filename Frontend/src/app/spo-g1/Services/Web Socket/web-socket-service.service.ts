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
  private voteFinishSubject: Subject<void> = new Subject<void>(); // Ajout pour la fin du vote
  private issueTitleSubject: Subject<string> = new Subject<string>();

  constructor() {
    this.stompClient = new Client();
    this.connect();
  }

  // Envoi de la notification de fin de vote
  sendFinishVote(): void {
    if (this.stompClient.connected) {
      this.stompClient.publish({
        destination: '/app/finish-vote',
        body: JSON.stringify({})
      });
      console.log('Vote finish message sent');
    } else {
      console.error('WebSocket is not connected');
    }
  }

  // Souscription à l'événement de fin de vote
  onVoteFinish(): Observable<void> {
    return this.voteFinishSubject.asObservable();
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

  // Création ou récupération d'un ID utilisateur basé sur la session
  private getOrCreateUserId(): string {
    let userId = sessionStorage.getItem('userId');
    if (!userId) {
      userId = this.generateUUID();
      sessionStorage.setItem('userId', userId);
    }
    return userId;
  }

  // Génération d'un UUID pour chaque utilisateur
  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  // Connexion au WebSocket
  private connect() {
    this.stompClient.webSocketFactory = () => {
      return new SockJS('http://localhost:8081/pages/ws');
    };

    this.stompClient.onConnect = (frame) => {
      console.log('Connected: ' + frame);

      // Souscription à la fin du vote
      this.stompClient.subscribe('/topic/vote-finished', (message) => {
        console.log('Received vote finish message:', message.body);
        this.voteFinishSubject.next();
      });

      // Souscription au démarrage du vote
      this.stompClient.subscribe('/topic/voteStart', (message) => {
        if (message.body) {
          console.log('Received vote start message:', message.body);
          this.voteStartSubject.next();
        }
      });

      // Souscription au titre de l'issue
      this.stompClient.subscribe('/topic/issueTitle', (message) => {
        if (message.body) {
          console.log('Received issue title:', message.body);
          this.issueTitleSubject.next(message.body);
        }
      });

      // Souscription aux choix validés
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

  // Envoi du choix validé
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

  // Souscription aux choix validés
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

  // Déconnexion
  disconnect() {
    if (this.stompClient.connected) {
      this.stompClient.deactivate();
      console.log('Disconnected');
    }
  }
}
