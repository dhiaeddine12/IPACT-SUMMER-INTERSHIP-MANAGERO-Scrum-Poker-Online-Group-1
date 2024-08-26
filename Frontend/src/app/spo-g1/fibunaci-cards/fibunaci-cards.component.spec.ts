import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FibunaciCardsComponent } from './fibunaci-cards.component';

describe('FibunaciCardsComponent', () => {
  let component: FibunaciCardsComponent;
  let fixture: ComponentFixture<FibunaciCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FibunaciCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FibunaciCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
