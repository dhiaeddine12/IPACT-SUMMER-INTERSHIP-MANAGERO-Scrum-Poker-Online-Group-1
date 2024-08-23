import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { Issue } from '../models/issues';
import { UserService } from '../services/UserService/user.service';
import { SessionPreperationService } from '../services/Session/session-prep.service';
import { IssueService } from '../services/issue.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-addsession',
  templateUrl: './addsession.component.html',
  styleUrls: ['./addsession.component.scss']
})
export class AddsessionComponent implements OnInit {
  issues: Issue[] = [];
  listUsers: any[] = [];
  projectId: any;
  add_session!: FormGroup;
  session: any;
  title: string = 'Session Preparation';
  selectedOption: string = '';
  options = ['Fibonacci', 'T-shirt'];
  issueAdded = new Set<string>(); // Use Set for storing issue IDs
  invitationSent = new Set<string>(); // Use Set for storing user emails
  
  // Check if an issue is added
  isIssueAdded(issueId: string): boolean {
    return this.issueAdded.has(issueId);
  }
  
  // Check if an invitation is sent
  isInvitationSent(email: string): boolean {
    return this.invitationSent.has(email);
  }
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialogRef: NbDialogRef<AddsessionComponent>,
    private userService: UserService,
    private sessionService: SessionPreperationService,
    private issueService: IssueService,
  ) {}

  ngOnInit() {
    this.add_session = this.fb.group({
      name: ['', Validators.required],
      start_date: ['', Validators.required],
    });

    this.loadUsers();
    this.loadIssues();
  }

  loadUsers(): void {
    this.userService.getAll().subscribe(
      (data: any) => this.listUsers = data,
      error => console.error('Error fetching users:', error),
    );
  }

  loadIssues(): void {
    this.issueService.getIssuesByProjectId(this.projectId).subscribe(
      issues => this.issues = issues,
      error => console.error('Error fetching issues:', error),
    );
  }

  inviteUser(email: string) {
    this.sessionService.createSessionAndSendEmail(email, this.session).subscribe(
      (response: any) => {
        alert('Mail Sent');
        this.invitationSent.add(email); // Mark the invitation as sent
      },
      error => console.error('Error inviting user:', error)
    );
  }

  ajouter_issue(id_issue: string) {
    if (this.session && this.session.id) {
      this.sessionService.ajouter_issue(id_issue, this.session.id).subscribe(
        (response: any) => {
          alert('Issue added successfully');
          this.issueAdded.add(id_issue); // Mark the issue as added
        },
        error => console.error('Error:', error)
      );
    } else {
      console.error("Session ID is undefined or null");
    }
  }



  close(result: boolean) {
    this.dialogRef.close(result);
  }

  // Method to create session before moving to step 2
  createSession() {
    const sessionData = this.add_session.value;

    this.sessionService.addSession(sessionData).subscribe(
      (response: any) => {
        this.session = response;
        this.sessionService.setSession(this.session); // Store the session
        console.log("Session created:", this.session);
      },
      error => console.error('Error creating session:', error)
    );
  }
 startSession_scrum_master() {
  if (this.session && this.session.id) {
    // Fetch the latest session data from the backend
    this.sessionService.getSessionById(this.session.id).subscribe(
      (updatedSession: any) => {
       
        if (updatedSession && updatedSession.token) {
          
          this.dialogRef.close();
    
          this.router.navigate(['pages/scrum_master', updatedSession.token]);
          console.log("Token for session:", updatedSession.token);
        } else {
          console.error("Updated session token is undefined or null");
        }
      },
      error => {
        console.error('Error fetching updated session:', error);
      }
    );
  } else {
    console.error("Session ID is undefined or null");
  }
}

  
  onOptionSelected(): void {
    if (this.selectedOption === 'Fibonacci') {
      this.router.navigate(['poker-planning/fibonacci']);
    } else if (this.selectedOption === 'T-shirt') {
      this.router.navigate(['poker-planning/tshirt']);
    }
  }
}