import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import { LoggerService } from '../Services/logger.service';
import { SessionPreperationService } from '../Service/session-preperation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-session-prep',
  templateUrl: './session-prep.component.html',
  styleUrls: ['./session-prep.component.scss'],
})
export class SessionPrepComponent implements OnInit {

  listUsers: any[] = [];
  session: any;

  constructor(private userService: UserService, private logger: LoggerService,
              private sessionService: SessionPreperationService, private router: Router) {}

  ngOnInit() {
    this.userService.getAll().subscribe(
      (data: any) => {
        this.listUsers = data;
        this.logger.log(this.listUsers); // Utilisation du service de journalisation
      },
      (error: any) => {
        this.logger.error('Une erreur s\'est produite lors de la récupération des utilisateurs : ' + error);
      },
    );
  }

  inviteUser(email: any) {
    console.log('Invitation pour :', email);
    const sessionId = '668edb1714515533cbbebf49'; // Remplacez par l'ID correct de la session
    this.sessionService.inviteUser(email, sessionId).subscribe(
      (response: any) => {
        console.log('Utilisateur invité avec succès :', response);
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
        console.log('Session ajoutée avec succès :', data);
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
