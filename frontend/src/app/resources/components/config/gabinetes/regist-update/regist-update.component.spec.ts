import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistUpdateComponent } from './regist-update.component';

describe('RegistUpdateComponent', () => {
  let component: RegistUpdateComponent;
  let fixture: ComponentFixture<RegistUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
