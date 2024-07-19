import { Component, OnInit } from '@angular/core';
import {WebSocketService} from "../Services/web socket/web-socket.service";


@Component({
  selector: 'app-poker-planning',
  templateUrl: './poker-planning.component.html',
  styleUrls: ['./poker-planning.component.scss']
})
export class PokerPlanningComponent implements OnInit{
  fibonacciSequence: number[] = [];

  constructor() {
  }

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

  /*  fibonacciSequence: number[] = [];
    lastClickedValue: number | null = null;

    constructor(private webSocketService: WebSocketService) { }

    ngOnInit() {
      this.generateFibonacciSequence(10); // Generate the first 10 Fibonacci numbers

      this.webSocketService.getLastClickedValue().subscribe(value => {
        this.lastClickedValue = value;
        console.log('Updated last clicked value: ', this.lastClickedValue);
      });
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

    onCardClick(value: number): void {
      if (value !== 0) {
        this.lastClickedValue = value;
        console.log('Last clicked value:', this.lastClickedValue);
        this.webSocketService.sendLastClickedValue(value);
      }
    }*/
}
