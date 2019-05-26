import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAutocompletatComponent } from './select-autocompletat.component';

describe('SelectAutocompletatComponent', () => {
  let component: SelectAutocompletatComponent;
  let fixture: ComponentFixture<SelectAutocompletatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectAutocompletatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAutocompletatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
