import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhattutoComponent } from './whattuto.component';

describe('WhattutoComponent', () => {
  let component: WhattutoComponent;
  let fixture: ComponentFixture<WhattutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhattutoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhattutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
