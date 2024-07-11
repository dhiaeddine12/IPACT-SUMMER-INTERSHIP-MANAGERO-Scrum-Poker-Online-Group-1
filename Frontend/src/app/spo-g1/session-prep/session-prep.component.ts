import {Component, OnInit} from '@angular/core';
import {UserService} from '../Services/user.service';
import {LoggerService} from '../Services/logger.service';
import {SessionPreperationService} from '../Service/session-preperation.service';

@Component({
  selector: 'ngx-session-prep',
  templateUrl: './session-prep.component.html',
  styleUrls: ['./session-prep.component.scss'],
})
export class SessionPrepComponent implements OnInit {

  listUsers: any[] = [];
  session: any ;
  constructor(private US: UserService, private logger: LoggerService, private SS: SessionPreperationService) {}

  ngOnInit() {


    this.US.getAll().subscribe(
      (data: any) => {
        this.listUsers = data;
        this.logger.log(this.listUsers); // Utilisation du service de journalisation
      },
      (error: any) => {
        this.logger.error('Une erreur s\'est produite lors de la récupération des données : ' + error);
      },
    );
  }
    userId: string;
  inviteUser(email: any) {
    console.log('khalil', email);
      this.SS.inviteUser(email, '668edb1714515533cbbebf49').subscribe(
        (response: any) => {
          console.log('User invited successfully:', response);
        },
        (error: any) => {
          console.error('There was an error inviting the user!', error);
        },
      );
  }

  addSession(): void {
    const newSession: any = {
      startDate: '2024-07-10T11:00:00',
      endDate: '2024-07-10T12:00:00',
      userList: [],
    };
    this.SS.addSession(newSession).subscribe(
      (data: any) => {
        console.log('Session added successfully', data);
        this.session = data;
      },
      (error: any) => {
        console.error('An error occurred while adding the session:', error);
      },
    );
  }
}
