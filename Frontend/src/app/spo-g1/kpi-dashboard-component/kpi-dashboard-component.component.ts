import { Component } from '@angular/core';
import {KpiService} from '../services/KPI/kpi-service.service';
import { Chart } from 'chart.js';
@Component({
  selector: 'ngx-kpi-dashboard-component',
  templateUrl: './kpi-dashboard-component.component.html',
  styleUrls: ['./kpi-dashboard-component.component.scss']
})
export class KpiDashboardComponentComponent {
  kpiData: any;

  constructor(private kpiService: KpiService) { }

  ngOnInit(): void {
    this.kpiService.getKpiData().subscribe(data => {
      this.kpiData = data;
      this.updateChart();
    });
    this.kpiService.getTopThreeIssuesByAverageVote().subscribe(data => {
      this.rankedIssues = data;
      this.updateIssueChart();
    });

    this.kpiService.getKpiData().subscribe(data => {
      this.kpiData = data;
      this.updateChart2();
    });
  }

  ngAfterViewInit(): void {
    this.updateChart();
  }
  updateChart(): void {
    const ctx = (document.getElementById('kpiChart') as HTMLCanvasElement).getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Total Votes'],
        datasets: [{
          label: 'KPI Data',
          data: [this.kpiData.totalIssues],
          backgroundColor: 'rgb(123,195,254)',
          borderColor: 'rgb(123,195,254)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  updateChart2(): void {
    const ctx = (document.getElementById('kpiChart2') as HTMLCanvasElement).getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Total Sessions', 'average Issues Per Session'],
        datasets: [{
          label: 'KPI Data',
          data: [this.kpiData.totalSessions, this.kpiData.averageIssuesPerSession],
          backgroundColor: 'rgb(174,101,253)',
          borderColor: 'rgb(123,195,254)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  rankedIssues: any[] = [];
  updateIssueChart(): void {
    const ctx = (document.getElementById('issueChart') as HTMLCanvasElement).getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.rankedIssues.map(issue => issue.title),
        datasets: [{
          label: 'Average Votes per Issue',
          data: this.rankedIssues.map(issue => issue.averageVote),
          backgroundColor: [
            'rgb(174,101,253)',
            'rgb(54,162,235)',
            'rgb(75,192,192)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgb(174,101,253)',
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
            text: 'Issues Ranked by Average Votes'
          }
        }
      }
    });
  }


}

