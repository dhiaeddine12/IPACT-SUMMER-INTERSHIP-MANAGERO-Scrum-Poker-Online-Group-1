import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-chronometre',
  templateUrl: './chronometre.component.html',
  styleUrls: ['./chronometre.component.scss'],
})
export class ChronometreComponent implements OnInit {
  hours: any = 0;
  minutes: any = 10;
  seconds: any = 0;
  timer: any;
  running: boolean = false;
  ngOnInit(): void {
    this.startTimer();
  }
  startTimer() {
    if (!this.running) {
      this.running = true;
      this.timer = setInterval(() => {
        if (this.seconds === 0) {
          if (this.minutes === 0) {
            if (this.hours === 0) {
              this.stopTimer();
            } else {
              this.hours--;
              this.minutes = 59;
              this.seconds = 59;
            }
          } else {
            this.minutes--;
            this.seconds = 59;
          }
        } else {
          this.seconds--;
        }
      }, 1000);
    }
  }

  stopTimer() {
    this.running = false;
    clearInterval(this.timer);
  }

  resetTimer() {
    this.running = false;
    clearInterval(this.timer);
    this.hours = 0;
    this.minutes = 10;
    this.seconds = 0;
  }
}
