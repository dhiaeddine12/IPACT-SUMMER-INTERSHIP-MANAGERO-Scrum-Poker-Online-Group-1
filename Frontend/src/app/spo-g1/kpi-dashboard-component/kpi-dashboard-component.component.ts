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
        labels: ['Total Votes', 'Total Issues'],
        datasets: [{
          label: 'KPI Data',
          data: [this.kpiData.totalVotes, this.kpiData.totalIssues],
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
}

