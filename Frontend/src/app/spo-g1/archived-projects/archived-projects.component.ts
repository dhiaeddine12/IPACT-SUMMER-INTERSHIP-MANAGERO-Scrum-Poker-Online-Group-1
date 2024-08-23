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
  selector: 'ngx-archived-projects',
  templateUrl: './archived-projects.component.html',
  styleUrls: ['./archived-projects.component.scss']
})
export class ArchivedProjectsComponent implements OnInit {
  archivedProjects: Project[] = [];

  constructor(private http: HttpClient, private toastrService: NbToastrService,  private dialogService: NbDialogService,) {}

  ngOnInit(): void {
    this.loadArchivedProjects();
  }

  loadArchivedProjects(): void {
    this.http.get<Project[]>('http://localhost:8081/api/projects/archived')
      .subscribe(data => {
        this.archivedProjects = data;
      });
  }

  deleteArchivedProject(event: Event, projectId: string): void {
    event.stopPropagation();
  
    // Open the confirmation dialog
    this.dialogService.open(ConfirmationDialogComponent, {
      context: {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this archived project?'
      },
    }).onClose.subscribe((confirmed: boolean) => {
      if (confirmed) {
        // Proceed with deletion
        this.http.delete(`http://localhost:8081/api/projects/deletep/${projectId}`)
          .subscribe(
            () => {
              this.loadArchivedProjects();
              this.toastrService.success('Project deleted successfully', 'Success');
            },
            (error) => {
              this.toastrService.danger('Error deleting project', 'Error');
              console.error('Error deleting project:', error);
            }
          );
      }
    });
  }

  restoreArchivedProject(event: Event, projectId: string): void {
    event.stopPropagation();
    this.http.put(`http://localhost:8081/api/projects/restore/${projectId}`, {})
      .subscribe(
        () => {
          this.loadArchivedProjects();
          this.toastrService.success('Project restored successfully', 'Success');
        },
        (error) => {
          this.toastrService.danger('Error restoring project', 'Error');
          console.error('Error restoring project:', error);
        }
      );
  }

}
