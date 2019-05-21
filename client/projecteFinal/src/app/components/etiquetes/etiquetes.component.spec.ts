import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtiquetesComponent } from './etiquetes.component';

describe('EtiquetesComponent', () => {
  let component: EtiquetesComponent;
  let fixture: ComponentFixture<EtiquetesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtiquetesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtiquetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
