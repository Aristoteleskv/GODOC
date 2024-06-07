import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastaPreviewComponent } from './pasta-preview.component';

describe('PastaPreviewComponent', () => {
  let component: PastaPreviewComponent;
  let fixture: ComponentFixture<PastaPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastaPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastaPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
