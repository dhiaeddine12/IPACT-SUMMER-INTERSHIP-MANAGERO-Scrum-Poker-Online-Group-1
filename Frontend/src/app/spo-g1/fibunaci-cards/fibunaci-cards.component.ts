import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebSocketService } from '../services/Web Socket/web-socket-service.service';
import { VotingService } from '../services/Voting/voting-service.service';

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
  sessionToken: string | null = null;
  issues: any[] = [];
  disabledCards: boolean[] = [];
  issueTitle: string | null = null;
  vote: any = {};

  constructor(
    private webSocketService: WebSocketService,
    private route: ActivatedRoute,
    private votingService: VotingService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.sessionToken = params.get('token');
    });

    this.generateFibonacciSequence(10);
    this.initializeDisabledCards();
    // Subscribe to WebSocket updates for issue title
    this.webSocketService.onIssueTitle().subscribe(title => {
      this.issueTitle = title;
      console.log('job', this.issueTitle);
    });
    // Subscribe to WebSocket for vote start and validated values
    this.webSocketService.onVoteStart().subscribe(() => {
      this.enableCards();
    });

    this.webSocketService.subscribeToValidatedValue(value => {
      this.validatedValue = value;
      console.log('Received validated value:', this.validatedValue);
    });


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
   {
      this.webSocketService.sendValidatedChoice(this.lastClickedValue);
      this.vote = {
        value: this.lastClickedValue,
        sessionToken: this.sessionToken,
        issueTitle: this.issueTitle
      };

      this.votingService.addVote(this.vote,this.sessionToken, this.issueTitle).subscribe(
        response => {

          alert('Vote Added successfully');
        },
        error => {
          console.error('Error adding vote', error);
          console.log('Last Clicked Value33:', this.lastClickedValue);
          console.log('Session Token:33', this.sessionToken);
          console.log('Issue Title:33', this.issueTitle);
        }
      );
    }
  }
  voteStatistics: any = {};
  fetchVoteStatistics(): void {
    if (this.issueTitle) {
      this.votingService.getVoteStatistics(this.issueTitle).subscribe(
        statistics => {
          this.voteStatistics = statistics;
          console.log('Vote statistics:', this.voteStatistics);
        },
        error => {
          console.error('Error fetching vote statistics', error);
        }
      );
    }
  }


}
