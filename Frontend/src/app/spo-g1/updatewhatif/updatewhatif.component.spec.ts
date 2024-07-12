import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatewhatifComponent } from './updatewhatif.component';

describe('UpdatewhatifComponent', () => {
  let component: UpdatewhatifComponent;
  let fixture: ComponentFixture<UpdatewhatifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatewhatifComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatewhatifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
