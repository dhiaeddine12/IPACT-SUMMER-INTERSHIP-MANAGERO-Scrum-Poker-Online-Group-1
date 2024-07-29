import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VotingService {
  private votingStateSource = new BehaviorSubject<boolean>(true); // true = disabled, false = enabled
  votingState$ = this.votingStateSource.asObservable();

  private lastClickedValueSource = new BehaviorSubject<number | null>(null);
  lastClickedValue$ = this.lastClickedValueSource.asObservable();

  private validatedValueSource = new BehaviorSubject<number | null>(null);
  validatedValue$ = this.validatedValueSource.asObservable();

  setVotingState(isDisabled: boolean) {
    this.votingStateSource.next(isDisabled);
  }

  setLastClickedValue(value: number | null) {
    this.lastClickedValueSource.next(value);
  }

  setValidatedValue(value: number | null) {
    this.validatedValueSource.next(value);
  }
}
