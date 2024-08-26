import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router'; 


@Component({
  selector: 'ngx-addissue',
  templateUrl: './addissue.component.html',
  styleUrls: ['./addissue.component.scss']
})
export class AddissueComponent  implements OnInit {
  submitted = false;
  issueForm: FormGroup;
  projectId: string;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastrService: NbToastrService,
    protected dialogRef: NbDialogRef<AddissueComponent>,
    private route: ActivatedRoute, 
  ) {}

  ngOnInit(): void {
    this.projectId = this.dialogRef.componentRef.instance.projectId;
    this.issueForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.issueForm.valid) {
      const issueData = {
        ...this.issueForm.value,
        project: this.projectId 
      };
      console.log('Issue Data:', issueData);

      this.http.post<any>('http://localhost:8081/api/issues/create-issue', issueData)
        .subscribe(
          (response) => {
            this.toastrService.success('Issue added successfully', 'Success');
            this.dialogRef.close(response);
          },
          (error) => {
            this.toastrService.danger('Error adding issue', 'Error');
            console.error('Error adding issue:', error);
          }
        );
    }
  }
  

  close(): void {
    this.dialogRef.close();
  }
}