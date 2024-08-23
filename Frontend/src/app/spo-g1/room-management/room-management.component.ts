import {Component, OnInit} from '@angular/core';
import { WebSocketService } from '../services/Web Socket/web-socket-service.service';
import {IssueService} from '../services/issue.service';

@Component({
  selector: 'ngx-room-management',
  templateUrl: './room-management.component.html',
  styleUrls: ['./room-management.component.scss']
})
export class RoomManagementComponent implements OnInit {
  issues: any[] = [];
  selectedIssue: any = null;
  voteValue: number | null = null;

  constructor(private issueService: IssueService, private webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.loadIssues();

    this.webSocketService.subscribeToValidatedValue((value) => {
      // Handle validated vote values here
      console.log('Received validated vote value:', value);
    });
  }

  loadIssues(): void {
    this.issueService.getIssues().subscribe((data: any[]) => {
      this.issues = data;
    });
  }

  selectIssue(issue: any): void {
    this.selectedIssue = issue;
  }

  submitVote(): void {
    if (this.voteValue !== null) {
    this.webSocketService.sendValidatedChoice(this.voteValue);
    this.voteValue = null; // Reset after vote
  } else {
    console.error('No vote value selected.');
  }
}
}
