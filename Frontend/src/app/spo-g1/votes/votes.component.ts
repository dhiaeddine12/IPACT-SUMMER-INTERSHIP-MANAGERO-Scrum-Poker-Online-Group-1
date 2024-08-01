import { Component } from '@angular/core';
import {VotingService} from '../services/Voting/voting-service.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'ngx-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.scss']
})
export class VotesComponent {
  voteStatistics: any;
  issueTitle: string;

  constructor(private votingService: VotingService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.issueTitle = params.get('issueTitle');
      this.loadStatistics();
    });
  }

  loadStatistics(): void {
    this.votingService.getVoteStatistics(this.issueTitle).subscribe(
        data => {
          this.voteStatistics = data;
        },
        error => {
          console.error('Error fetching vote statistics', error);
        }
    );
  }
}
