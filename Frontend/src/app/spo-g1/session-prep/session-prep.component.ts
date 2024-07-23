import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../Services/logger.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SessionPreperationService} from '../services/Session/session-prep.service';
import {UserService} from '../services/UserService/user.service';
import {IssueService} from '../services/issue.service';
import {Issue} from '../models/issues';

@Component({
  selector: 'ngx-session-prep',
  templateUrl: './session-prep.component.html',
  styleUrls: ['./session-prep.component.scss'],
})
export class SessionPrepComponent implements OnInit {
  issues: Issue[] = [];

  listUsers: any[] = [];
  projectId: any;
  session: any;
  add_session!: FormGroup;
  constructor(private userService: UserService, private logger: LoggerService,
              private sessionService: SessionPreperationService, private router: Router,
              private fb: FormBuilder, private route: ActivatedRoute, private issueService: IssueService) {
  }
  roomName: string; // Nouvelle variable pour le nom de la salle

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.projectId = params.get('projectId');
    });
    this.loadIssues();
    this.add_session = this.fb.group({
      name: ['', Validators.required],  // Ajoutez des validateurs si nécessaire
    });


    this.userService.getAll().subscribe(
      (data: any) => {
        this.listUsers = data;
       // this.logger.log(this.listUsers); // Utilisation du service de journalisation
      },
      (error: any) => {
       // this.logger.error('Une erreur s\'est produite lors de la récupération des utilisateurs : ' + error);
      },
    );
  }

  loadIssues(): void {
    this.issueService.getIssuesByProjectId(this.projectId).subscribe(
      issues => this.issues = issues,
      error => console.error('Error fetching issues:', error),
    );
  }
  Add() {
    const session = {
    };
    this.onOptionSelected();
   // console.log(this.add_session.value);
    this.sessionService.addSession(session).
    subscribe(() => {alert('adde Success');
    }); }


  inviteUser(email: any) {
  //  console.log('Invitation pour :', email);
    const sessionId = '668edb1714515533cbbebf49'; // Remplacez par l'ID correct de la session
    this.sessionService.inviteUser(email, sessionId).subscribe(
      (response: any) => {
       // console.log('Utilisateur invité avec succès :', response);
      },
      (error: any) => {
        console.error('Une erreur s\'est produite lors de l\'invitation de l\'utilisateur :', error);
      },
    );
  }

  addSession(): void {
    const newSession: any = {
      startDate: '2024-07-10T11:00:00',
      endDate: '2024-07-10T12:00:00',
      userList: [],
    };
    this.sessionService.addSession(newSession).subscribe(
      (data: any) => {
      //  console.log('Session ajoutée avec succès :', data);
        this.session = data;
      },
      (error: any) => {
        console.error('Une erreur s\'est produite lors de l\'ajout de la session :', error);
      },
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