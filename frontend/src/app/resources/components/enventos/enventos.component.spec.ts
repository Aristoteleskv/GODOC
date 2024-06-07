import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnventosComponent } from './enventos.component';

describe('EnventosComponent', () => {
  let component: EnventosComponent;
  let fixture: ComponentFixture<EnventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnventosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
