import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRecepcaoComponent } from './dashboard-recepcao.component';

describe('DashboardRecepcaoComponent', () => {
  let component: DashboardRecepcaoComponent;
  let fixture: ComponentFixture<DashboardRecepcaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardRecepcaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardRecepcaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
