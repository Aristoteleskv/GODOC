import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastasUploadComponent } from './pastas-upload.component';

describe('PastasUploadComponent', () => {
  let component: PastasUploadComponent;
  let fixture: ComponentFixture<PastasUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastasUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastasUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
