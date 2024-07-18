import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTutowhyComponent } from './add-tutowhy.component';

describe('AddTutowhyComponent', () => {
  let component: AddTutowhyComponent;
  let fixture: ComponentFixture<AddTutowhyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTutowhyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTutowhyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
