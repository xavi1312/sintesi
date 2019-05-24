import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotoFixeBottomComponent } from './boto-fixe-bottom.component';

describe('BotoFixeBottomComponent', () => {
  let component: BotoFixeBottomComponent;
  let fixture: ComponentFixture<BotoFixeBottomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotoFixeBottomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotoFixeBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
