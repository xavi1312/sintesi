import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TascaComponent } from './tasca.component';

describe('TascaComponent', () => {
  let component: TascaComponent;
  let fixture: ComponentFixture<TascaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TascaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TascaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
