import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { tap } from 'rxjs/operators';
import { AddprojectComponent } from '../addproject/addproject.component';
import { UpdateprojectComponent } from '../updateproject/updateproject.component';
import { Chart, registerables } from 'chart.js';
import { environment } from '../../../environments/environment';
import { IssueStatusChartComponent } from '../issue-status-chart/issue-status-chart.component';
interface Project {
  id: string;
  title: string;
  problematics: any[];
  description: string;
  status: string;
  statementOfWork: string;
  dateSubmitted: Date;
  archived: boolean;
  issuesIds:any[];
}

@Component({
  selector: 'ngx-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit{
  projects: Project[] = [];
  chart: any;
  searchTerm: string = '';
  constructor(
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProjects();
    this.http.get<{ [key: string]: number }>(`${environment.apiUrl}/api/issues/status-counts`)
    .subscribe(data => {
      this.createChart(data);
    });
  }
  getProjects() {
    this.http.get<Project[]>('http://localhost:8081/api/projects')
      .subscribe(data => {
        this.projects = data;
      });
  }
  navigateToAddProject() {
    this.dialogService.open(AddprojectComponent)
      .onClose.subscribe(projectData => {
        if (projectData) {
          
          this.loadProjects();
        }
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
  navigateToArchivedProjects(): void {
    this.router.navigate(['pages/spo-g1/archived-projects']);
  }
  navigateToKPI(): void {
    this.router.navigate(['pages/spo-g1/kpi-dashboard']);
  }
  /*
  loadProjects() {
    this.http.get('http://localhost:8081/api/projects')
      .subscribe(
        (projects: any) => {
          this.projects = projects;
        },
        (error) => {
          this.toastrService.danger('Error loading projects', 'Error');
          console.error('Error loading projects:', error);
        }
      );
  }
*/
loadProjects(): void {
  this.http.get<Project[]>('http://localhost:8081/api/projects')
    .subscribe(data => {
      this.projects = data.filter(project => !project.archived);
    });
}

get filteredProjects(): Project[] {
  if (!this.searchTerm) {
    return this.projects;
  }
  return this.projects.filter(project =>
    project.title.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}
  editProject(event: Event, project: any): void {
    event.stopPropagation();
  

    const dialogRef = this.dialogService.open(UpdateprojectComponent, {
      context: {
        projectData: {
          id: project.id,
          title: project.title,
          description: project.description,
          status: project.status
        }
      }
    });
  
    dialogRef.onClose.subscribe((updatedProjectData) => {
      if (updatedProjectData) {
        this.loadProjects();
      }
    });
  }
  
  
  deleteProject(event: Event, project: any) {
    event.stopPropagation(); 
    console.log(project); 
    
    this.dialogService.open(ConfirmationDialogComponent, {
      context: {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this project?'
      },
    }).onClose.subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.http.delete(`http://localhost:8081/api/projects/deletep/${project.id}`)
          .pipe(
            tap(() => {
      
              this.projects = this.projects.filter(p => p.id !== project.id);
            })
          )
          .subscribe(
            () => {

              this.toastrService.success('Project deleted successfully', 'Success');
              this.router.navigate([this.router.url]); 
            },
            (error) => {
         
              this.toastrService.danger('Error deleting project', 'Error');
              console.error('Error deleting project:', error);
            }
          );
      }
    });
  }
  
  navigateToProjectIssues(projectId: string) {
    this.router.navigate(['pages/spo-g1/issues', projectId]);
  }

  archiveProject(event: Event, project: Project): void {
    project.archived = true;
    this.http.put<Project>(`http://localhost:8081/api/projects/updatep/${project.id}`, project)
      .subscribe(
        updatedProject => {
          this.toastrService.success('Project archived successfully');
          this.loadProjects();  // Refresh the project list to reflect the change
        },
        error => {
          this.toastrService.danger('Failed to archive project');
          console.error(error);
        }
      );
  }
  
  restoreProject(event: Event, project: any): void {
    event.stopPropagation();
    this.http.put(`http://localhost:8081/api/projects/restore/${project.id}`, {})
      .subscribe(
        () => {
          this.loadProjects();
          this.toastrService.success('Project restored successfully', 'Success');
        },
        (error) => {
          this.toastrService.danger('Error restoring project', 'Error');
          console.error('Error restoring project:', error);
        }
      );
  }
  
  getArchivedProjects() {
    this.http.get<Project[]>('http://localhost:8081/api/projects/archived')
      .subscribe(data => {
        this.projects = data;
      });
  }










}


