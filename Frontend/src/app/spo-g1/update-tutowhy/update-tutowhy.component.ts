import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NbDialogRef, NbToastrService } from '@nebular/theme';
import {TutowhyService} from "../Services/tutowhy/tutowhy.service";
@Component({
  selector: 'ngx-update-tutowhy',
  templateUrl: './update-tutowhy.component.html',
  styleUrls: ['./update-tutowhy.component.scss']
})
export class UpdateTutowhyComponent implements OnInit{

  whytutoform: FormGroup;
  whytutodata: any;
  constructor(
    private fb: FormBuilder,
    private toastrService: NbToastrService,
    protected dialogRef: NbDialogRef<UpdateTutowhyComponent>,
    private tutowhyService: TutowhyService
  ) {}

  ngOnInit(): void {
    this.whytutoform = this.fb.group({
      title: [this.whytutodata.description, Validators.required],
      description: [this.whytutodata.description, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.whytutoform.valid && this.whytutodata.id) {
      const updatedWhyTuto: any = {
        id: this.whytutodata.id,
        whyTitle: this.whytutoform.value.title,
        whyDescription: this.whytutoform.value.description
      };

      this.tutowhyService.updateTutoWhy(updatedWhyTuto).subscribe(
        (response) => {
          this.toastrService.success('WhyTuto updated successfully', 'Success');
          this.dialogRef.close(response);
        },
        (error) => {
          this.toastrService.danger('Error updating WhyTuto', 'Error');
          console.error('Error updating WhyTuto:', error);
        }
      );
    }

  }

  close(): void {
    this.dialogRef.close();
  }
}
