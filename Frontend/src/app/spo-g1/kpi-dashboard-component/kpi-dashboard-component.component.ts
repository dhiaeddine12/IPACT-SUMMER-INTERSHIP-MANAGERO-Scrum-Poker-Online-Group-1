import { Component, OnInit, AfterViewInit } from '@angular/core';
import { KpiService } from '../Services/KPI/kpi-service.service';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
  selector: 'ngx-kpi-dashboard-component',
  templateUrl: './kpi-dashboard-component.component.html',
  styleUrls: ['./kpi-dashboard-component.component.scss']
})
export class KpiDashboardComponentComponent implements OnInit, AfterViewInit {
  kpiData: any;
  statusChart: any;
  averageIssuesPerSession: any;
  rankedIssues: any[] = [];
  projects: any[] = [];
  pourcentages: { [key: string]: number } = {};

  constructor(
    private kpiService: KpiService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getProjects();

    this.kpiService.getKpiData().subscribe(data => {
      this.kpiData = data;
      this.averageIssuesPerSession = data.averageIssuesPerSession; // Assign averageIssuesPerSession
      console.log('KPI Data:', data);
      this.updateChart();
      this.updateChart2();
      this.updateChart3();
      this.updateStatusChart(data.projectsPerStatus);
    });

    this.kpiService.getTopThreeIssuesByAverageVote().subscribe(data => {
      this.rankedIssues = data;
      this.updateIssueChart();
      this.updateIssuePieChart(); // For pie chart
    });
  }
  updateStatusChart(projectsPerStatus: any[]): void {
    const ctx = document.getElementById('statusChart') as HTMLCanvasElement;
    if (!ctx) return;

    if (this.statusChart) {
      this.statusChart.destroy(); // Destroy previous chart instance if it exists
    }

    this.statusChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: projectsPerStatus.map(project => project.status),
        datasets: [{
          label: 'Number of Projects per Status',
          data: projectsPerStatus.map(project => project.count),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
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
            text: 'Number of Projects per Status'
          }
        },
        scales: {
          x: {
            beginAtZero: true
          }
        }
      }
    });
  }
  getProjects() {
    this.http.get<any[]>('http://localhost:8081/api/projects').subscribe(data => {
      this.projects = data;

      this.projects.forEach(project => {
        this.kpiService.Pourcentage_avancement_projet(project.id).subscribe(
          (pourcentage1: number) => {
            this.pourcentages[project.id] = pourcentage1;
          },
          (error) => {
            console.error('Error fetching pourcentage:', error);
          }
        );
      });
    });
  }

  Pourcentage(id: any) {
    this.kpiService.Pourcentage_avancement_projet(id).subscribe(
      (pourcentage1: number) => {
        this.pourcentages[id] = pourcentage1;
      },
      (error) => {
        console.error('Error fetching pourcentage:', error);
      }
    );
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
          data: [this.kpiData?.totalVotes, this.averageIssuesPerSession],
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
        labels: ['Total Sessions', 'Average Issues Per Session'],
        datasets: [{
          label: 'KPI Data',
          data: [this.kpiData?.totalSessions, this.averageIssuesPerSession],
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

  updateChart3(): void {
    const ctx = (document.getElementById('kpiChart3') as HTMLCanvasElement).getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Total Projects'],
        datasets: [{
          label: 'KPI Data',
          data: [this.kpiData?.totalProjects],
          backgroundColor: 'rgb(255,99,132)',  // Red color for the bar
          borderColor: 'rgb(255,99,132)',  
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

  updateIssueChart(): void {
    const ctx = (document.getElementById('issueChart') as HTMLCanvasElement).getContext('2d');
    new Chart(ctx, {
      type: 'bar',
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

  updateIssuePieChart(): void {
    const ctx = (document.getElementById('issuePieChart') as HTMLCanvasElement).getContext('2d');
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
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.label || '';
                if (context.parsed) {
                  label += `: ${context.raw} (${context.percent.toFixed(2)}%)`;
                }
                return label;
              }
            }
          }
        }
      }
    });
  }
  scaleValue(value: number): number {
    const minValue = 0; // Minimum value to ensure visibility
    const maxValue = 2; // Maximum value for scaling
    const scaleFactor = 100; // Scale to 100% width of the progress bar
  
    // Ensure the value is within the defined range
    const clampedValue = Math.max(minValue, Math.min(value, maxValue));
    
    // Scale the value to the progress bar width
    return (clampedValue / maxValue) * scaleFactor;
  }
  
  
}
