import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepachosComponent } from './depachos.component';

describe('DepachosComponent', () => {
  let component: DepachosComponent;
  let fixture: ComponentFixture<DepachosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DepachosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DepachosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
