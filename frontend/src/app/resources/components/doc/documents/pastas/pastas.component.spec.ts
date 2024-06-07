import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastasComponent } from './pastas.component';

describe('PastasComponent', () => {
  let component: PastasComponent;
  let fixture: ComponentFixture<PastasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
