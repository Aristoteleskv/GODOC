import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastasUpdateComponent } from './pastas-update.component';

describe('PastasUpdateComponent', () => {
  let component: PastasUpdateComponent;
  let fixture: ComponentFixture<PastasUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PastasUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PastasUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
