import { Component, OnInit, ViewChild  } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {CreategameService} from '../services/creategame/creategame.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Component({
  moduleId: module.id,
  templateUrl: './creategame.component.html',
  styleUrls: ['./creategame.component.scss']
})
export class CreategameComponent {

  gameForm: FormGroup;
  isLoading = false;

  constructor(private formBuilder: FormBuilder, private creategameService: CreategameService) {
    this.gameForm = this.formBuilder.group({
      room_name: ['', Validators.required],
      votetype: ['Fibonacci_Sequence_Cards', Validators.required] // Default value, adjust as needed
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
