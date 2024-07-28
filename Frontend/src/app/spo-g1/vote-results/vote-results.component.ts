import { Component, OnInit } from '@angular/core';
import {WebSocketService} from '../services/Web Socket/web-socket-service.service';

@Component({
  selector: 'ngx-vote-results',
  templateUrl: './vote-results.component.html',
  styleUrls: ['./vote-results.component.scss']
})
export class VoteResultsComponent implements OnInit {
  votes: { [key: string]: { [key: string]: number } } = {};

  constructor(private webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.webSocketService.subscribeToValidatedValue((vote) => {
      // Here you can process the vote data
      // Assuming vote contains sessionId, userId, and vote value
    //  this.processVote(vote);
    });
  }

  private processVote(vote: { sessionId: string, userId: string, value: number }): void {
    if (!this.votes[vote.sessionId]) {
      this.votes[vote.sessionId] = {};
    }
    this.votes[vote.sessionId][vote.userId] = vote.value;
  }

  getVotesArray(): { sessionId: string, userId: string, value: number }[] {
    const results = [];
    for (const sessionId in this.votes) {
      for (const userId in this.votes[sessionId]) {
        results.push({ sessionId, userId, value: this.votes[sessionId][userId] });
      }
    }
    return results;
  }
}
