import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiDashboardComponentComponent } from './kpi-dashboard-component.component';

describe('KpiDashboardComponentComponent', () => {
  let component: KpiDashboardComponentComponent;
  let fixture: ComponentFixture<KpiDashboardComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KpiDashboardComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KpiDashboardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
