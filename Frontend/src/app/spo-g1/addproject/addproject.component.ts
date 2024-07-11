import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'ngx-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.scss']
})
export class AddprojectComponent implements OnInit{

  projectForm: FormGroup;
  projectData: any; 
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastrService: NbToastrService,
    protected dialogRef: NbDialogRef<AddprojectComponent>
  ) {}


  ngOnInit(): void {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
    });

  }

  onSubmit() {
    if (this.projectForm.valid) {
      this.http.post('http://localhost:8081/api/projects/add', this.projectForm.value)
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

  close() {
    this.dialogRef.close();
  }
}
