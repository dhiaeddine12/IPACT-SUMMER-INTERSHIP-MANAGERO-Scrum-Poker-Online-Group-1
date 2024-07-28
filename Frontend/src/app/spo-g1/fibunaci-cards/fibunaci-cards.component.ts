import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../services/Web Socket/web-socket-service.service';
import {SessionPreperationService} from '../services/Session/session-prep.service';

@Component({
  selector: 'ngx-fibunaci-cards',
  templateUrl: './fibunaci-cards.component.html',
  styleUrls: ['./fibunaci-cards.component.scss']
})
export class FibunaciCardsComponent implements OnInit {
  fibonacciSequence: number[] = [];
  lastClickedValue: number | null = null;
  validatedValue: number | null = null;
  userEmail: string = '';

  constructor(private webSocketService: WebSocketService, private sessionService:SessionPreperationService) { }

  ngOnInit(): void {
    this.generateFibonacciSequence(10); // Generate the first 10 Fibonacci numbers

    // Optional: Subscribe to updates from WebSocketService
    this.webSocketService.subscribeToValidatedValue((value) => {
      this.validatedValue = value;
      console.log('Received validated value:', this.validatedValue);
    });
  }

  generateFibonacciSequence(count: number): void {
    this.fibonacciSequence = [];
    let a = 0, b = 1;
    for (let i = 0; i < count; i++) {
      this.fibonacciSequence.push(a);
      const temp = a;
      a = b;
      b = temp + b;
    }
  }

  onCardClick(value: number): void {
    this.lastClickedValue = value;
    console.log('Last clicked value:', this.lastClickedValue);
  }

  validateChoice(): void {
    if (this.lastClickedValue !== null) {
      this.webSocketService.sendValidatedChoice(this.lastClickedValue); // Send the validated choice to the backend
    } else {
      console.error('No value selected to validate.');
    }
  }


}
