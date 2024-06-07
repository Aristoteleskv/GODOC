import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareEmailComponent } from './share-email.component';

describe('ShareEmailComponent', () => {
  let component: ShareEmailComponent;
  let fixture: ComponentFixture<ShareEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShareEmailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShareEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
