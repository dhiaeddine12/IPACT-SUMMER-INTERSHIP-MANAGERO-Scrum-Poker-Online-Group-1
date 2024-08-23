import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TShirtCardsComponent } from './t-shirt-cards.component';

describe('TShirtCardsComponent', () => {
  let component: TShirtCardsComponent;
  let fixture: ComponentFixture<TShirtCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TShirtCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TShirtCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
