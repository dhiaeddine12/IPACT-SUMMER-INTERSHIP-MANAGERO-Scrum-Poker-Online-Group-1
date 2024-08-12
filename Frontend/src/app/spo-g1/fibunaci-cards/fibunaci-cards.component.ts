import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VotingService } from '../services/Voting/voting-service.service';
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
    this.setupWebSocketSubscriptions();

    // Example login, ideally this should be handled via actual authentication
    this.login('exampleUser', 'exampleToken');
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

  login(username: string, token: string): void {
    // Create a user object with the necessary information
    const user = {
      username: username,
      token: token // This could be an authentication token
    };

    // Store the user object in localStorage
    localStorage.setItem('user', JSON.stringify(user));
  }

  validateChoice(): void {
    this.webSocketService.sendValidatedChoice(this.lastClickedValue);

    // Retrieve user information from localStorage
    const storedUser = localStorage.getItem('user');
    let username = 'khalil';
    if (storedUser) {
      const user = JSON.parse(storedUser);
      username = user.username;
    }
    console.log('Retrieved username:', username);

    // Prepare the vote object
    this.vote = {
      value: this.lastClickedValue,
      sessionToken: this.sessionToken,
      issueTitle: this.issueTitle,
      user: username // Add the logged-in user
    };

    // Call the service to add the vote
    this.votingService.addVote(this.vote, this.sessionToken, this.issueTitle,username).subscribe(
      response => {
        alert('Vote added successfully');
        console.log('Last Clicked Value:', this.lastClickedValue);
        console.log('Session Token:', this.sessionToken);
        console.log('Issue Title:', this.issueTitle);
        console.log('user:',username);
      },
      error => {
        console.error('Error adding vote', error);
        console.log('Last Clicked Value:', this.lastClickedValue);
        console.log('Session Token:', this.sessionToken);
        console.log('Issue Title:', this.issueTitle);
        console.log('user:',username);
      }
    );
  }

  setupWebSocketSubscriptions(): void {
    this.webSocketService.onIssueTitle().subscribe(title => {
      this.issueTitle = title;
      console.log('Received issue title:', this.issueTitle);
    });

    this.webSocketService.onVoteStart().subscribe(() => {
      this.enableCards();
    });

    this.webSocketService.subscribeToValidatedValue(value => {
      this.validatedValue = value;
      console.log('Received validated value:', this.validatedValue);
    });
  }
}
