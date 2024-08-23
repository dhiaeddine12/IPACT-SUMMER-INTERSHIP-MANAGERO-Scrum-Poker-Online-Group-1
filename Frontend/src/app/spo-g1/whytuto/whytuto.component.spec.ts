import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhytutoComponent } from './whytuto.component';

describe('WhytutoComponent', () => {
  let component: WhytutoComponent;
  let fixture: ComponentFixture<WhytutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhytutoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhytutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
