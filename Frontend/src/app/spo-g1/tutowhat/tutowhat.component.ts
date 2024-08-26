
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { TutowhatService } from '../services/tutowhat/tutowhat.service';
@Component({
  selector: 'ngx-tutowhat',
  templateUrl: './tutowhat.component.html',
  styleUrls: ['./tutowhat.component.scss']
})
export class TutowhatComponent implements OnInit{
  whattutoform: FormGroup;
  whattutodata: any; 
  


  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastrService: NbToastrService,
    protected dialogRef: NbDialogRef<TutowhatComponent>,
    private route: ActivatedRoute, 
    private tutowhatService: TutowhatService
  ) {}

  ngOnInit(): void {
    this.whattutoform = this.fb.group({
      
      description: [this.whattutodata.description, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.whattutoform.valid && this.whattutodata.id) {
      const updatedIssueData: any = {
        id: this.whattutodata.id,
        whatDescription: this.whattutoform.value.description
      };

      this.tutowhatService.updateTutoWhat(updatedIssueData)
        .subscribe(
          (response) => {
            this.toastrService.success('What tuto updated successfully', 'Success');
            this.dialogRef.close(response);
          },
          (error) => {
            this.toastrService.danger('Error updating what tuto', 'Error');
            console.error('Error updating issue:', error);
          }
        );
    }
  }
  close(): void {
    this.dialogRef.close();
  }





}
