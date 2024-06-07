import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocoDeNotasComponent } from './bloco-de-notas.component';

describe('BlocoDeNotasComponent', () => {
  let component: BlocoDeNotasComponent;
  let fixture: ComponentFixture<BlocoDeNotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlocoDeNotasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlocoDeNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
