import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardGabineteComponent } from './dashboard-gabinete.component';

describe('DashboardGabineteComponent', () => {
  let component: DashboardGabineteComponent;
  let fixture: ComponentFixture<DashboardGabineteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardGabineteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardGabineteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
