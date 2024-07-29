import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {WebSocketService} from '../services/Web Socket/web-socket-service.service';

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
  sessionToken: any;
  issues: any[] = [];
  disabledCards: boolean[] = [];
  issueTitle: string | null = null;  // Declare the issueTitle variable

  constructor(private webSocketService: WebSocketService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.webSocketService.onIssueTitle().subscribe(title => {
      this.issueTitle = title;
      console.log('job:', this.issueTitle);
    });

    this.route.paramMap.subscribe(params => {
      this.sessionToken = params.get('token');
    });
    this.generateFibonacciSequence(10);
    this.initializeDisabledCards();

    // Subscribe to WebSocket for vote start and validated values
    this.webSocketService.onVoteStart().subscribe(() => {
      this.enableCards();
    });

    this.webSocketService.subscribeToValidatedValue((value) => {
      this.validatedValue = value;
      console.log('Received validated value:', this.validatedValue);
    });

    // Subscribe to WebSocket updates for issue title

  }

  generateFibonacciSequence(count: number): void {
    this.fibonacciSequence = [];
    let a = 0, b = 1;
    for (let i = 0; i < count; i++) {
      this.fibonacciSequence.push(a);
      [a, b] = [b, a + b];
    }
  }

  initializeDisabledCards(): void {
    this.disabledCards = this.fibonacciSequence.map(() => true);
  }

  enableCards(): void {
    this.disabledCards = this.fibonacciSequence.map(() => false);
  }

  isCardDisabled(number: number): boolean {
    const index = this.fibonacciSequence.indexOf(number);
    return this.disabledCards[index];
  }

  onCardClick(value: number): void {
    const index = this.fibonacciSequence.indexOf(value);
    if (!this.disabledCards[index]) {
      this.lastClickedValue = value;
      console.log('Last clicked value:', this.lastClickedValue);
    }
  }

  validateChoice(): void {
    if (this.lastClickedValue !== null) {
      this.webSocketService.sendValidatedChoice(this.lastClickedValue);
    } else {
      console.error('No value selected to validate.');
    }
  }
}
