import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionPreperationService } from '../services/Session/session-prep.service';
import { UserService } from '../services/UserService/user.service';
import { IssueService } from '../services/issue.service';
import { Issue } from '../models/issues';

@Component({
  selector: 'ngx-session-prep',
  templateUrl: './session-prep.component.html',
  styleUrls: ['./session-prep.component.scss'],
})
export class SessionPrepComponent implements OnInit {
  issues: Issue[] = [];
  listUsers: any[] = [];
  projectId: any;
  add_session!: FormGroup;

  constructor(
      private userService: UserService,
      private sessionService: SessionPreperationService,
      private router: Router,
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private issueService: IssueService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.projectId = params.get('projectId');
    });

    this.add_session = this.fb.group({
      name: ['', Validators.required],
      start_date: ['', Validators.required]
    });
  }
   session:any;
  Add(): void {
     this.session = {
      start_date: this.add_session.value.start_date,
      name: this.add_session.value.name
    };
    console.log(this.add_session.value);

    this.sessionService.addSession(this.session).subscribe(
        () => {
          alert('Session added successfully');
          this.loadUsers(); // Fetch users
          this.loadIssues(); // Fetch issues
        },
        error => {
          console.error('Error adding session:', error);
          alert('Failed to add session');
        }
    );
  }

  loadUsers(): void {
    this.userService.getAll().subscribe(
        (data: any) => {
          this.listUsers = data;
        },
        error => console.error('Error fetching users:', error)
    );
  }

  loadIssues(): void {
    this.issueService.getIssuesByProjectId(this.projectId).subscribe(
        issues => this.issues = issues,
        error => console.error('Error fetching issues:', error)
    );
  }

  inviteUser(email: any) {
    const sessionId = '668edb1714515533cbbebf49'; // Replace with the correct session ID
    console.log(email);
    this.sessionService.createSessionAndSendEmail(email,this.session).subscribe(

   // this.sessionService.inviteUser(email,this.session.id).subscribe(
        (response: any) => {
          console.log(email);
          console.log('User invited successfully:', response);
        },
        (error: any) => {
          console.error('Error inviting user:', error);
        }
    );
  }

  ajouter_issue(id_issue: any) {
    this.sessionService.ajouter_issue(id_issue,this.session.id).subscribe(
        (response: any) => {
          console.log('add successfully:', response);
        },
        (error: any) => {
          console.error('Error:', error);
        }
    );
  }

  selectedOption: string;
  options = ['Fibonacci', 'T-shirt'];

  onOptionSelected(): void {
    if (this.selectedOption === 'Fibonacci') {
      this.router.navigate(['poker-planning/fibonacci']);
    } else if (this.selectedOption === 'T-shirt') {
      this.router.navigate(['poker-planning/tshirt']);
    }
  }
}
