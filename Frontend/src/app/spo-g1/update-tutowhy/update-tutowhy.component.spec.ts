import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTutowhyComponent } from './update-tutowhy.component';

describe('UpdateTutowhyComponent', () => {
  let component: UpdateTutowhyComponent;
  let fixture: ComponentFixture<UpdateTutowhyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTutowhyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTutowhyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
