
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { TutowhyService , TutoWhy } from '../services/tutowhy/tutowhy.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'ngx-add-tutowhy',
  templateUrl: './add-tutowhy.component.html',
  styleUrls: ['./add-tutowhy.component.scss']
})
export class AddTutowhyComponent implements OnInit{
  submitted = false;
  whytutoform: FormGroup;
  whyTutoList: TutoWhy[] = [];
  whytutodata: any; 
  constructor(
    private fb: FormBuilder,
    private toastrService: NbToastrService,
    protected dialogRef: NbDialogRef<AddTutowhyComponent>,
    private tutowhyService: TutowhyService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.whytutoform = this.fb.group({
      whyTitle: ['', Validators.required],
      whyDescription: ['', Validators.required]
    });

   
  }
  

  onSubmit(): void {
    this.submitted = true;

    if (this.whytutoform.valid) {
      this.http.post('http://localhost:8081/whytuto/add_whytuto', this.whytutoform.value)
        .subscribe(
          (response) => {
            this.toastrService.success('Project added successfully', 'Success');
            this.dialogRef.close(response);
          },
          (error) => {
            this.toastrService.danger('Error adding project', 'Error');
            console.error('Error adding project:', error);
          }
        );
    }
  }

  close(): void {
    this.dialogRef.close();
  }

}






























