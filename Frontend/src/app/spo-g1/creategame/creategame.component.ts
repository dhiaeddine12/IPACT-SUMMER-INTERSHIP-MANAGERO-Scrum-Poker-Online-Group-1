import { Component, OnInit, ViewChild  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {CreategameService} from '../services/creategame/creategame.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Component({
  moduleId: module.id,
  templateUrl: './creategame.component.html',
  styleUrls: ['./creategame.component.scss']
})
export class CreategameComponent  implements OnInit {

  gameForm: FormGroup;
  isLoading = false;
  issueTitle: string;
  constructor(private formBuilder: FormBuilder, private creategameService: CreategameService,  private route: ActivatedRoute) {
    this.gameForm = this.formBuilder.group({
      room_name: ['', Validators.required],
      votetype: ['Fibonacci_Sequence_Cards', Validators.required] // Default value, adjust as needed
    });
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.gameForm.patchValue({
        room_name: params['room_name'] || '',
        votetype: params['votetype'] || 'Fibonacci_Sequence_Cards'
      });
      this.issueTitle = params['issue_title'] || '';
    });
  }
  onSubmit(): void {
    if (this.gameForm.valid) {
      this.isLoading = true;
      this.creategameService.createCreateGame(this.gameForm.value)
        .pipe(
          catchError(err => {
            console.error('Error creating game:', err);
            return throwError(err);
          })
        )
        .subscribe(() => {
          this.isLoading = false;
          this.gameForm.reset();
          // Optionally, you can navigate to another page or show a success message
          alert('Game created successfully!');
        });
    }
  }






}