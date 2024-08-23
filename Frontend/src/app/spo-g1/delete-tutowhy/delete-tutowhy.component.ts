import { Component, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { TutowhyService } from '../services/tutowhy/tutowhy.service';

@Component({
  selector: 'ngx-delete-tutowhy',
  templateUrl: './delete-tutowhy.component.html',
  styleUrls: ['./delete-tutowhy.component.scss']
})
export class DeleteTutowhyComponent {
  @Input() whyTuto: any; 
  @Input() whytutodata: { id: string };
  constructor(
    private toastrService: NbToastrService,
    protected dialogRef: NbDialogRef<DeleteTutowhyComponent>,
    private tutowhyService: TutowhyService
  ) {}


 
  confirmDelete(): void {
    this.tutowhyService.deleteTutoWhy(this.whytutodata.id).subscribe(
      () => {
        this.toastrService.success('WhyTuto deleted successfully', 'Success');
        this.dialogRef.close(true);
      },
      (error) => {
        this.toastrService.danger('Error deleting WhyTuto', 'Error');
        console.error('Error deleting WhyTuto:', error);
      }
    );
  }

  close(): void {
    this.dialogRef.close();
  }
}
