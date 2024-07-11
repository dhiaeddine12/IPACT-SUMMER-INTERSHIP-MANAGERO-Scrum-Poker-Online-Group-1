import { Component, OnInit } from '@angular/core';
import { Issue } from '../models/issues';
import { IssueService } from '../services/issue.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {
startSession() {
throw new Error('Method not implemented.');
}
navigateToAddIssue() {
throw new Error('Method not implemented.');
}

  issues: Issue[] = [];
  projectId: string;
  constructor(
    private route: ActivatedRoute,
    private issueService: IssueService
  ) { }
  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.loadIssues();
  }
  loadIssues(): void {
    this.issueService.getIssuesByProjectId(this.projectId).subscribe(
      issues => this.issues = issues,
      error => console.error('Error fetching issues:', error)
    );
  }
}
