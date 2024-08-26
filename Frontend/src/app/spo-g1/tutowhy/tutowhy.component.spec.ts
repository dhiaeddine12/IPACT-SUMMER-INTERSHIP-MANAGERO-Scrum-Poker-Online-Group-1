import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutowhyComponent } from './tutowhy.component';

describe('TutowhyComponent', () => {
  let component: TutowhyComponent;
  let fixture: ComponentFixture<TutowhyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutowhyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutowhyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
