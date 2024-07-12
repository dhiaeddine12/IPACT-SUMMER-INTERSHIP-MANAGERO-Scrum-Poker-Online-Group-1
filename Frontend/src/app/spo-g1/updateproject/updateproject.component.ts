import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'ngx-updateproject',
  templateUrl: './updateproject.component.html',
  styleUrls: ['./updateproject.component.scss']
})
export class UpdateprojectComponent implements OnInit{

  projectForm: FormGroup;
  projectData: any; 
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastrService: NbToastrService,
    protected dialogRef: NbDialogRef<UpdateprojectComponent>
  ) {}
 
  ngOnInit(): void {
    this.projectForm = this.fb.group({
      title: [this.projectData.title, Validators.required],
      description: [this.projectData.description, Validators.required],
      status: [this.projectData.status, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      const updatedProjectData = {
        id: this.projectData.id,
        title: this.projectForm.value.title,
        description: this.projectForm.value.description,
        status: this.projectForm.value.status
      };

      this.http.put(`http://localhost:8081/api/projects/updatep/${updatedProjectData.id}`, updatedProjectData)
        .subscribe(
          (response) => {
            this.toastrService.success('Project updated successfully', 'Success');
            this.dialogRef.close(updatedProjectData); 
          },
          (error) => {
            this.toastrService.danger('Error updating project', 'Error');
            console.error('Error updating project:', error);
          }
        );
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}