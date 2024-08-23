import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateissueComponent } from './updateissue.component';

describe('UpdateissueComponent', () => {
  let component: UpdateissueComponent;
  let fixture: ComponentFixture<UpdateissueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateissueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateissueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
