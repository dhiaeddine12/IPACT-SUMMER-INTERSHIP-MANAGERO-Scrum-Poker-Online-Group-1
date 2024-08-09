import { Component } from '@angular/core';
import { VotingService } from '../services/Voting/voting-service.service';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';

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
      this.votingService.getVoteStatistics(this.issueTitle).subscribe(
        data => {
          this.voteStatistics = data;
          this.updateVoteChart();  // Update the chart once data is loaded
        },
        error => {
          console.error('Error fetching vote statistics', error);
        }
      );
    });
  }

  updateVoteChart(): void {
    const ctx = (document.getElementById('voteChart') as HTMLCanvasElement).getContext('2d');
    new Chart(ctx, {
      type: 'pie', // or 'bar' depending on your preference
      data: {
        labels: Object.keys(this.voteStatistics),
        datasets: [{
          label: 'Votes by Complexity',
          data: Object.values(this.voteStatistics),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: `Votes for Issue: ${this.issueTitle}`
          }
        }
      }
    });
  }
}
