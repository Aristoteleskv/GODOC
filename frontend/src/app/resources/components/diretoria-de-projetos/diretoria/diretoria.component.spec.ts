import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiretoriaComponent } from './diretoria.component';

describe('DiretoriaComponent', () => {
  let component: DiretoriaComponent;
  let fixture: ComponentFixture<DiretoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiretoriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiretoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
