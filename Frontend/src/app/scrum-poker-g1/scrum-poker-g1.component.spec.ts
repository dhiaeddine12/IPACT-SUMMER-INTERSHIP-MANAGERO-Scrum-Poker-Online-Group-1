import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrumPokerG1Component } from './scrum-poker-g1.component';

describe('ScrumPokerG1Component', () => {
  let component: ScrumPokerG1Component;
  let fixture: ComponentFixture<ScrumPokerG1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrumPokerG1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrumPokerG1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
