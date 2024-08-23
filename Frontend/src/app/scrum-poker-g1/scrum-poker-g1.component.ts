
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WhattutoService,WhatTuto } from '../spo-g1/services/whattuto/whattuto.service';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { TutowhatComponent } from '../spo-g1/tutowhat/tutowhat.component';
import { TutowhatService , TutoWhat } from '../spo-g1/services/tutowhat/tutowhat.service';
import { TutowhyService, TutoWhy } from '../spo-g1/services/tutowhy/tutowhy.service';
import { DeleteTutowhyComponent} from '../spo-g1/delete-tutowhy/delete-tutowhy.component';  
import { AddTutowhyComponent } from '../spo-g1/add-tutowhy/add-tutowhy.component';
import { UpdateTutowhyComponent } from '../spo-g1/update-tutowhy/update-tutowhy.component';
import { NbIconModule } from '@nebular/theme';
import { HttpErrorResponse } from '@angular/common/http';
import { Whatif } from '../spo-g1/models/Whatif';
import { WhatifService } from '../spo-g1/services/whatif.service';
import { UpdatewhatifComponent } from '../spo-g1/updatewhatif/updatewhatif.component';
@Component({
  selector: 'ngx-scrum-poker-g1',
  templateUrl: './scrum-poker-g1.component.html',
  styleUrls: ['./scrum-poker-g1.component.scss']
})
export class ScrumPokerG1Component  implements OnInit {
  
  whatTutos: WhatTuto[] = [];
  addForm: FormGroup;
  tutowhat: TutoWhat | undefined;
  tutowhy: TutoWhy| undefined;
  whatif: Whatif | undefined;
  tutowhys: TutoWhy[] = [];
  constructor( private fb: FormBuilder,   private toastrService: NbToastrService,
    private dialogService: NbDialogService, private tutowhatService: TutowhatService , private tutowhyService: TutowhyService, private whatifService: WhatifService) {

    this.addForm = this.fb.group({
      WhyTitle: [''],
      WhyDescription: ['']
    });
  }


  ngOnInit(): void {
   
    this.fetchTutoWhat();
    this.fetchTutoWhy();
    this.fetchWhatif();

  }
  fetchWhatif(): void {
    this.whatifService.getAllWhatifs().subscribe((data: Whatif[]) => {
      if (data.length > 0) {
        this.whatif = data[0]; 
      }
    });
  }

  fetchTutoWhy(): void {
    this.tutowhyService.getAllTutoWhys().subscribe((data: TutoWhy[]) => {
      this.tutowhys = data;
    });
  }
  fetchTutoWhat(): void {
    this.tutowhatService.getAllTutoWhats().subscribe((data: TutoWhat[]) => {
      if (data.length > 0) {
        this.tutowhat = data[0]; 
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


  deleteWhyTuto(event: Event, tutowhy: TutoWhy): void {
    event.stopPropagation();

    const dialogRef = this.dialogService.open(DeleteTutowhyComponent, {
      context: { whytutodata: { id: tutowhy.id } }
    });

    dialogRef.onClose.subscribe((result) => {
      if (result) {
        this.fetchTutoWhy();
      }
    });
  }

  addWhyTuto(): void {
    const dialogRef = this.dialogService.open(AddTutowhyComponent);

    dialogRef.onClose.subscribe((newWhyTuto) => {
      if (newWhyTuto) {
        this.fetchTutoWhy();
      }
    });
  }
   
  }







