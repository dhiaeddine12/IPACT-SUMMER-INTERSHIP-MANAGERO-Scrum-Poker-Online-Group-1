import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTutowhyComponent } from './delete-tutowhy.component';

describe('DeleteTutowhyComponent', () => {
  let component: DeleteTutowhyComponent;
  let fixture: ComponentFixture<DeleteTutowhyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTutowhyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteTutowhyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
