import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueStatusChartComponent } from './issue-status-chart.component';

describe('IssueStatusChartComponent', () => {
  let component: IssueStatusChartComponent;
  let fixture: ComponentFixture<IssueStatusChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssueStatusChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssueStatusChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
