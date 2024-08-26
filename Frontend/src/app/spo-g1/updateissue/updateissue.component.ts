import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router'; 
@Component({
  selector: 'ngx-updateissue',
  templateUrl: './updateissue.component.html',
  styleUrls: ['./updateissue.component.scss']
})
export class UpdateissueComponent implements OnInit {

  issueForm: FormGroup;
  issueData: any; 
  projectId: string;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastrService: NbToastrService,
    protected dialogRef: NbDialogRef<UpdateissueComponent>,
    private route: ActivatedRoute, 
  ) {}

  ngOnInit(): void {
    
    this.issueForm = this.fb.group({
      title: [this.issueData.title, Validators.required],
      description: [this.issueData.description, Validators.required],
      status: [this.issueData.status, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.issueForm.valid && this.issueData.id) {
      const updatedIssueData = {
        id: this.issueData.id,
        title: this.issueForm.value.title,
        description: this.issueForm.value.description,
        status: this.issueForm.value.status
      };
  
      this.http.put<any>(`http://localhost:8081/api/issues/update-issue/${this.issueData.id}`, updatedIssueData)
        .subscribe(
          (response) => {
            this.toastrService.success('Issue updated successfully', 'Success');
            this.dialogRef.close(response); // Close dialog on success
          },
          (error) => {
            this.toastrService.danger('Error updating issue', 'Error');
            console.error('Error updating issue:', error);
          }
        );
    }
  }

  close(): void {
    this.dialogRef.close();
  }   }
