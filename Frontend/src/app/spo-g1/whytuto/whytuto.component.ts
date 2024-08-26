import { Component, OnInit } from '@angular/core';

import { WhyTuto, WhytutoService } from '../services/whytuto/whytuto.service';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { tap } from 'rxjs/operators';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'ngx-whytuto',
  templateUrl: './whytuto.component.html',
  styleUrls: ['./whytuto.component.scss']
})
export class WhytutoComponent  implements OnInit{
  whyTutos: WhyTuto[] = [];
  addForm: FormGroup;
  constructor(private whyTutoService: WhytutoService, private fb: FormBuilder) {

    this.addForm = this.fb.group({
      WhyTitle: [''],
      WhyDescription: ['']
    });
  }


  ngOnInit(): void {
    this.whyTutoService.getWhytuto().subscribe((data: WhyTuto[]) => {
      this.whyTutos = data;
    });
  }

  fetchWhyTutos(): void {
    this.whyTutoService.getWhytuto().subscribe((data: WhyTuto[]) => {
      this.whyTutos = data;
    });
  }

}
