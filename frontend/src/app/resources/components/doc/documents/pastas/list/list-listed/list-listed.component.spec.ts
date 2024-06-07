import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListListedComponent } from './list-listed.component';

describe('ListListedComponent', () => {
  let component: ListListedComponent;
  let fixture: ComponentFixture<ListListedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListListedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListListedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
