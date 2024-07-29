import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrumMasterCardsComponent } from './scrum-master-cards.component';

describe('ScrumMasterCardsComponent', () => {
  let component: ScrumMasterCardsComponent;
  let fixture: ComponentFixture<ScrumMasterCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrumMasterCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrumMasterCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
