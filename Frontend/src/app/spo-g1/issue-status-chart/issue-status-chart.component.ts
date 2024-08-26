import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'ngx-issue-status-chart',
  templateUrl: './issue-status-chart.component.html',
  styleUrls: ['./issue-status-chart.component.scss']
})
export class IssueStatusChartComponent implements OnInit {
  chart: any;
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    
    this.http.get<{ [key: string]: number }>(`${environment.apiUrl}/api/issues/status-counts`)
      .subscribe(data => {
        this.createChart(data);
      });
  }

  createChart(data: { [key: string]: number }): void {
    const ctx = document.getElementById('statusChart') as HTMLCanvasElement;

    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(data),
        datasets: [{
          label: 'Number of Projects per Status',
          data: Object.values(data),
          backgroundColor: [
            '#ff6384',
            '#36a2eb',
            '#cc65fe',
            '#ffce56',
          ],
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            beginAtZero: true
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
