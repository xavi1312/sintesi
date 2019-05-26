import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TascaLlistaComponent } from './tasca-llista.component';

describe('TascaLlistaComponent', () => {
  let component: TascaLlistaComponent;
  let fixture: ComponentFixture<TascaLlistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TascaLlistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TascaLlistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
