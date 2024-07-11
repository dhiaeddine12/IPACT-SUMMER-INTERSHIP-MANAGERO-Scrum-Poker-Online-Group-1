import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { tap } from 'rxjs/operators';
import { AddprojectComponent } from '../addproject/addproject.component';
import { UpdateprojectComponent } from '../updateproject/updateproject.component';

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
  constructor(
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProjects();
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
}


