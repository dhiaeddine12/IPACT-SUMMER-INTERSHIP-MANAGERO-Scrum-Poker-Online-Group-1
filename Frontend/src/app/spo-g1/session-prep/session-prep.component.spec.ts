import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionPrepComponent } from './session-prep.component';

describe('SessionPrepComponent', () => {
  let component: SessionPrepComponent;
  let fixture: ComponentFixture<SessionPrepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionPrepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionPrepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
