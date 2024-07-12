import { Component, OnInit } from '@angular/core';
import { Whatif } from '../spo-g1/models/Whatif';
import { WhatifService } from '../spo-g1/services/whatif.service';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { UpdatewhatifComponent } from '../spo-g1/updatewhatif/updatewhatif.component';

@Component({
  selector: 'ngx-scrum-poker-g1',
  templateUrl: './scrum-poker-g1.component.html',
  styleUrls: ['./scrum-poker-g1.component.scss']
})
export class ScrumPokerG1Component implements OnInit {

  
  whatif: Whatif | undefined;

  constructor(private whatifService: WhatifService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,
  ) { }

  ngOnInit(): void {
    this.fetchWhatif();
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