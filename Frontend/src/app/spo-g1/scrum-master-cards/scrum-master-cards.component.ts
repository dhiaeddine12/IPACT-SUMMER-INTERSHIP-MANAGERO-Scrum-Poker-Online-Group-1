import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../services/Web Socket/web-socket-service.service';
import { SessionPreperationService } from '../services/Session/session-prep.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-scrum-master-cards',
  templateUrl: './scrum-master-cards.component.html',
  styleUrls: ['./scrum-master-cards.component.scss']
})
export class ScrumMasterCardsComponent implements OnInit {
  fibonacciSequence: number[] = [];
  lastClickedValue: number | null = null;
  validatedValue: number | null = null;
  isVotingDisabled = true;
  sessionToken: string | null = null;
  issues: any[] = [];

  constructor(
      private webSocketService: WebSocketService,
      private sessionService: SessionPreperationService,
      private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.sessionToken = params.get('token');
      if (this.sessionToken) {
        this.loadIssues();
      } else {
        console.error('Session token is not defined.');
      }
    });

    this.generateFibonacciSequence(10);
    this.subscribeToWebSocket();
  }

  generateFibonacciSequence(count: number): void {
    this.fibonacciSequence = [];
    let a = 0, b = 1;
    for (let i = 0; i < count; i++) {
      this.fibonacciSequence.push(a);
      [a, b] = [b, a + b];
    }
  }

  loadIssues(): void {
    this.sessionService.getIssues_By_Session(this.sessionToken!)
        .subscribe(
            (issues: any[]) => {
              console.log('Fetched issues:', issues);
              this.issues = issues;
            },
            (error: any) => console.error('Error fetching issues:', error)
        );
  }

  startVote(issue: any): void {
    this.isVotingDisabled = false;
    this.webSocketService.sendVoteStart(); // Notify other clients to start voting
    console.log('Vote started for issue:', issue);
  }

  finishVote(): void {
    this.isVotingDisabled = true;
    this.webSocketService.sendVoteStart(); // Optionally, notify other clients to finish voting
    console.log('Vote finished');
  }

  onCardClick(value: number): void {
    if (!this.isVotingDisabled) {
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

  private subscribeToWebSocket(): void {
    this.webSocketService.subscribeToValidatedValue((value: number) => {
      this.validatedValue = value;
      console.log('Received validated value:', this.validatedValue);
    });
  }
}