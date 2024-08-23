import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../services/Web Socket/web-socket-service.service';
import { SessionPreperationService } from '../services/Session/session-prep.service';
import { ActivatedRoute ,Router} from '@angular/router';
import {VotingService} from "../Services/Voting/voting-service.service";

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
  selectedIssueTitle:any;
  isCardFlipped = false;
  issueTitle: string | null = null;
  vote: any = {};
  constructor(
    private webSocketService: WebSocketService,
    private sessionService: SessionPreperationService,
    private route: ActivatedRoute,
    private votingService: VotingService,
    private router: Router,
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
      [a, b] = [b, a + b]; // Simplified Fibonacci sequence generation
    }
  }

  loadIssues(): void {
    console.log('Loading issues for session token:', this.sessionToken);
    this.sessionService.getIssues_By_Session(this.sessionToken!)
      .subscribe(
        (issues: any[]) => {
          console.log('Fetched issues:', issues);
          this.issues = issues;
        },
        (error: any) => {
          console.error('Error fetching issues:', error);
          // Optionally display a user-friendly error message
        }
      );
  }

  issue_title:any;
  startVote(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const issue = this.issues.find(issue => issue.title === selectElement.value);
    this.issue_title=issue.title;
    if (issue) {
      this.isVotingDisabled = false;
      this.isCardFlipped = false;
      this.lastClickedValue = null; 
      this.selectedIssueTitle = issue.title;
      console.log('Selected Issue Title:', this.selectedIssueTitle);
      this.webSocketService.sendVoteStart();
      this.webSocketService.sendIssueTitle(issue.title); // Send issue title to WebSocket
      console.log('Vote started for issue:', issue);
    }
  }


  finishVote(): void {
    this.isVotingDisabled = true;
    console.log('Vote finished');
    console.log("job",this.selectedIssueTitle);
    // Inform all users that the vote is finished
    this.webSocketService.sendFinishVote();
    this.router.navigate(['pages/votes',this.sessionToken ]);
  }

  onCardClick(value: number): void {
    if (!this.isVotingDisabled) {
      this.lastClickedValue = value;
      console.log('Last clicked value:', this.lastClickedValue);
    }
  }

  validateChoice(): void {
    if (this.lastClickedValue !== null) {
      let username="khalil"
      this.isCardFlipped = true;
      this.vote = {
        value: this.lastClickedValue,
        //sessionToken: this.sessionToken,
        //  issueTitle: this.issueTitle,
        //user: username // Add the logged-in user
      };
      this.webSocketService.sendValidatedChoice(this.lastClickedValue);
      this.votingService.addVote(this.vote, this.sessionToken, this.issue_title,username).subscribe(
        response => {
          alert('Vote added successfully');
          console.log('Last Clicked Value:', this.lastClickedValue);
          console.log('Session Token:', this.sessionToken);
          console.log('Issue Title:', this.issue_title);
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
    } else {
      console.error('No value selected to validate.');
    }
  }

  private subscribeToWebSocket(): void {
    this.webSocketService.onVoteStart().subscribe(() => {
      this.isVotingDisabled = false;
    });

    this.webSocketService.onIssueTitle().subscribe(title => {
      this.selectedIssueTitle = title;
      console.log('Received issue title:', this.selectedIssueTitle);
    });

    this.webSocketService.subscribeToValidatedValue((value: number) => {
      this.validatedValue = value;
      console.log('Received validated value:', this.validatedValue);
    });
  }

}
