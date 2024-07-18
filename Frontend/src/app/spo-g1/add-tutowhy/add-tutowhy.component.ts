import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import {TutowhyService} from "../Services/tutowhy/tutowhy.service";
@Component({
  selector: 'ngx-add-tutowhy',
  templateUrl: './add-tutowhy.component.html',
  styleUrls: ['./add-tutowhy.component.scss']
})
export class AddTutowhyComponent implements OnInit{

  whytutoform: FormGroup;
  whytutodata: any;
  constructor(
    private fb: FormBuilder,
    private toastrService: NbToastrService,
    protected dialogRef: NbDialogRef<AddTutowhyComponent>,
    private tutowhyService: TutowhyService
  ) {}

  ngOnInit(): void {
    this.whytutoform = this.fb.group({
      whyTitle: ['', Validators.required],
      whyDescription: ['', Validators.required]
    });


  }


  onSubmit(): void {
    if (this.whytutoform.valid ) {
      const newWhyTuto = {
        id: this.whytutodata.id,
        whyTitle: this.whytutoform.value.whyTitle,
        whyDescription: this.whytutoform.value.whyDescription
      };

      this.tutowhyService.addTutoWhy(newWhyTuto).subscribe(
        (response) => {
          this.toastrService.success('WhyTuto added successfully', 'Success');
          this.whytutoform.reset();
          this.dialogRef.close(response);
        },
        (error) => {
          this.toastrService.danger('Error adding WhyTuto', 'Error');
          console.error('Error adding WhyTuto:', error);
        }
      );
    }


  }

  close(): void {
    this.dialogRef.close();
  }


}















