import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarGabinetComponent } from './sidebar-gabinet.component';

describe('SidebarGabinetComponent', () => {
  let component: SidebarGabinetComponent;
  let fixture: ComponentFixture<SidebarGabinetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarGabinetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarGabinetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
