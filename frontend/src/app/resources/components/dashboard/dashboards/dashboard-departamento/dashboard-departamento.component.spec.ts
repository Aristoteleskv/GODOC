import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDepartamentoComponent } from './dashboard-departamento.component';

describe('DashboardDepartamentoComponent', () => {
  let component: DashboardDepartamentoComponent;
  let fixture: ComponentFixture<DashboardDepartamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardDepartamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDepartamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
