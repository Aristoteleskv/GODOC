import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastaCreateComponent } from './pasta-create.component';

describe('PastaCreateComponent', () => {
  let component: PastaCreateComponent;
  let fixture: ComponentFixture<PastaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastaCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
