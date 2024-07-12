import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'ngx-fibunaci-cards',
  templateUrl: './fibunaci-cards.component.html',
  styleUrls: ['./fibunaci-cards.component.scss'],
})
export class FibunaciCardsComponent implements OnInit {
  fibonacciSequence: number[] = [];

  constructor() { }

  ngOnInit(): void {
    this.generateFibonacciSequence(10); // Generate the first 10 Fibonacci numbers
  }

  generateFibonacciSequence(count: number): void {
    this.fibonacciSequence = [];
    let a = 0, b = 1;
    for (let i = 0; i < count; i++) {
      this.fibonacciSequence.push(a);
      const temp = a;
      a = b;
      b = temp + b;
    }
  }
  clickedValues: number[] = [];
  lastClickedValue: number | null = null;
  onCardClick(value: number): void {
    this.lastClickedValue = value;
    console.log('Last clicked value:', this.lastClickedValue);
  }


}

