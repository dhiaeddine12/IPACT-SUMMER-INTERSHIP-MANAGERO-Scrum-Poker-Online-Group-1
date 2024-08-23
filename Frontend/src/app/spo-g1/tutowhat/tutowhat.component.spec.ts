import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutowhatComponent } from './tutowhat.component';

describe('TutowhatComponent', () => {
  let component: TutowhatComponent;
  let fixture: ComponentFixture<TutowhatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutowhatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutowhatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
