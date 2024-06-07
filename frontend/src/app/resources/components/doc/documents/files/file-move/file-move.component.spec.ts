import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileMoveComponent } from './file-move.component';

describe('FileMoveComponent', () => {
  let component: FileMoveComponent;
  let fixture: ComponentFixture<FileMoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileMoveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FileMoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
