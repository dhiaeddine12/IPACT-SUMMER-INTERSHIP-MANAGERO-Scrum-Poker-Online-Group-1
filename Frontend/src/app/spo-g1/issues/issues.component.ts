import { Component, OnInit } from '@angular/core';
import { Issue } from '../models/issues';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { AddissueComponent } from '../addissue/addissue.component';
import { UpdateissueComponent } from '../updateissue/updateissue.component';
import {IssueService} from "../Services/issues/issue.service";

@Component({
  selector: 'ngx-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss'],
})
export class IssuesComponent implements OnInit {


  openAddIssueDialog(): void {
    this.dialogService.open(AddissueComponent, {
      context: {
        projectId: this.projectId, // Pass projectId to the dialog
      },
    }).onClose.subscribe((result) => {
      if (result) {
        this.loadIssues(); // Reload issues after adding new issue
        // Handle dialog close if needed
       // console.log('Dialog closed with result:', result);
      }
    });

<<<<<<< Updated upstream
    console.log('Project ID sent to AddissueComponent:', this.projectId);
  }

startSession() {
throw new Error('Method not implemented.');
}
=======
   // console.log('Project ID sent to AddissueComponent:', this.projectId);
  }
  startSession2(): void {
    // For demonstration, let's use the first issue's title
    const firstIssueTitle = this.issues.length > 0 ? this.issues[0].title : 'Default Issue Title';

    this.router.navigate(['pages/poker-planning/preparation',  this.projectId ]);
  }

  startSession(): void {
    // For demonstration, let's use the first issue's title
    const firstIssueTitle = this.issues.length > 0 ? this.issues[0].title : 'Default Issue Title';

    this.router.navigate(['pages/spo-g1/creategame'], {
      queryParams: {
        room_name: 'Default Room Name', // Modify as needed
        votetype: 'Fibonacci_Sequence_Cards', // Modify as needed
        issue_title: firstIssueTitle,
      },
    });
  }
>>>>>>> Stashed changes

  issues: Issue[] = [];
  projectId: string;
  constructor(
    private route: ActivatedRoute,
    private issueService: IssueService,
    private http: HttpClient,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.loadIssues();
  }
  loadIssues(): void {
    this.issueService.getIssuesByProjectId(this.projectId).subscribe(
      issues => this.issues = issues,
      error => console.error('Error fetching issues:', error),
    );
  }

  deleteIssue(event: Event, issue: any): void {
    event.stopPropagation();


    this.dialogService.open(ConfirmationDialogComponent, {
      context: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this issue?',
      },
    }).onClose.subscribe((confirmed: boolean) => {
      if (confirmed) {

        this.issueService.deleteIssueFromProject(this.projectId, issue.id).subscribe(
          () => {
            this.toastrService.success('Issue deleted successfully', 'Success');

            this.loadIssues();
          },
          (error) => {
            this.toastrService.danger('Error deleting issue', 'Error');
            console.error('Error deleting issue:', error);
          },
        );
      }
    });
  }

  editIssue(event: Event, issue: any): void {
    event.stopPropagation();


    const dialogRef = this.dialogService.open(UpdateissueComponent, {
      context: {
        issueData: {
          id: issue.id,
          title: issue.title,
          description: issue.description,
          status: issue.status,
        },
      },
    });


    dialogRef.onClose.subscribe((updateIssueData) => {
      if (updateIssueData) {
        this.loadIssues();
      }
    });
  }

}
