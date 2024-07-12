import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbDialogRef, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-updatewhatif',
  templateUrl: './updatewhatif.component.html',
  styleUrls: ['./updatewhatif.component.scss']
})
export class UpdatewhatifComponent implements OnInit{
  whatifform: FormGroup;
  whatifdata: any; 

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastrService: NbToastrService,
    protected dialogRef: NbDialogRef<UpdatewhatifComponent>,
    private route: ActivatedRoute, 
  ) {}
 
  ngOnInit(): void {
    this.whatifform = this.fb.group({
      title: [this.whatifdata.title, Validators.required],
      description: [this.whatifdata.description, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.whatifform.valid && this.whatifdata.id) {
      const updatedIssueData = {
        id: this.whatifdata.id,
        title: this.whatifform.value.title,
        description: this.whatifform.value.description,
      };

      this.http.put<any>(`http://localhost:8081/api/whatif/updatewhatif/${this.whatifdata.id}`, updatedIssueData)
        .subscribe(
          (response) => {
            this.toastrService.success('What if updated successfully', 'Success');
            this.dialogRef.close(response);
          },
          (error) => {
            this.toastrService.danger('Error updating what if', 'Error');
            console.error('Error updating issue:', error);
          }
        );
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}