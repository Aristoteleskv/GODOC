import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatModalComponent } from './creat-modal.component';

describe('CreatModalComponent', () => {
  let component: CreatModalComponent;
  let fixture: ComponentFixture<CreatModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
