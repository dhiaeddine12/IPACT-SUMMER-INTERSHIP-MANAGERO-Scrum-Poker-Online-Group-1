
import { Component, OnInit } from '@angular/core';
import { Whatif } from '../spo-g1/models/Whatif';

import { NbDialogService, NbToastrService } from '@nebular/theme';
import { UpdatewhatifComponent } from '../spo-g1/updatewhatif/updatewhatif.component';
import {WhatifService} from "../spo-g1/Services/tutowhatif/whatif.service";
import {TutoWhat, TutowhatService} from "../spo-g1/Services/tutowhat/tutowhat.service";
import {TutoWhy, TutowhyService} from "../spo-g1/Services/tutowhy/tutowhy.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {TutowhatComponent} from "../spo-g1/tutowhat/tutowhat.component";
import {UpdateTutowhyComponent} from "../spo-g1/update-tutowhy/update-tutowhy.component";


@Component({
  selector: 'ngx-scrum-poker-g1',
  templateUrl: './scrum-poker-g1.component.html',
  styleUrls: ['./scrum-poker-g1.component.scss']
})

export class ScrumPokerG1Component implements OnInit {

  tutowhat: TutoWhat | undefined;
  tutowhy: TutoWhy| undefined;
  whatif: Whatif | undefined;
  addForm: FormGroup;
  constructor( private fb: FormBuilder,   private toastrService: NbToastrService,
               private dialogService: NbDialogService, private tutowhatService: TutowhatService ,
               private tutowhyService: TutowhyService,
               private whatifService:WhatifService ) {

    this.addForm = this.fb.group({
      WhyTitle: [''],
      WhyDescription: [''],
    });
  }
  ngOnInit(): void {
    this.fetchWhatif();
    this.fetchTutoWhat();
    this.fetchTutoWhy();
  }
  fetchTutoWhy(): void {
    this.tutowhyService.getAllTutoWhys().subscribe((data: TutoWhy[]) => {
      if (data.length > 0) {
        this.tutowhy = data[0];
      }
    });
  }
  fetchTutoWhat(): void {
    this.tutowhatService.getAllTutoWhats().subscribe((data: TutoWhat[]) => {
      if (data.length > 0) {
        this.tutowhat = data[0];
      }
    });
  }


  editWhattuto(event: Event, tutowhat: TutoWhat ): void {
    event.stopPropagation();

    const dialogRef = this.dialogService.open(TutowhatComponent, {
      context: {
        whattutodata: {
          id: tutowhat.id,

          whatDescription: tutowhat.whatDescription,
        }
      }
    });

    dialogRef.onClose.subscribe((updateIssueData) => {
      if (updateIssueData) {
        this.fetchTutoWhat();
      }
    });
  }


  updatewhytuto(event: Event, tutowhy: TutoWhy): void {
    event.stopPropagation();


    console.log('Opening update dialog for:', tutowhy);
    const dialogRef = this.dialogService.open(UpdateTutowhyComponent, {
      context: {
        whytutodata: {
          id: tutowhy.id,
          whyTitle: tutowhy.whyTitle,
          whyDescription: tutowhy.whyDescription,
        }
      }
    });

    dialogRef.onClose.subscribe((updatedWhyTuto) => {
      if (updatedWhyTuto) {
        this.fetchTutoWhy();
      }
    });
  }
  fetchWhatif(): void {
    this.whatifService.getAllWhatifs().subscribe((data: Whatif[]) => {
      if (data.length > 0) {
        this.whatif = data[0];
      }
    });
  }


  editIssue(event: Event, whatif: Whatif): void {
    event.stopPropagation();

    const dialogRef = this.dialogService.open(UpdatewhatifComponent, {
      context: {
        whatifdata: {
          id: whatif.id,
          title: whatif.title,
          description: whatif.description,
        }
      }
    });

    dialogRef.onClose.subscribe((updateIssueData) => {
      if (updateIssueData) {
        this.fetchWhatif(); // Refresh data after update
      }
    });
  }

}
