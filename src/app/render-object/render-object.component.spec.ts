import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderObjectComponent } from './render-object.component';

describe('RenderObjectComponent', () => {
  let component: RenderObjectComponent;
  let fixture: ComponentFixture<RenderObjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderObjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
