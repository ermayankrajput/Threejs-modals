import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitQuoteComponent } from './unit-quote.component';

describe('UnitQuoteComponent', () => {
  let component: UnitQuoteComponent;
  let fixture: ComponentFixture<UnitQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitQuoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
