import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeighingPageComponent } from './weighing-page.component';

describe('WeighingPageComponent', () => {
  let component: WeighingPageComponent;
  let fixture: ComponentFixture<WeighingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeighingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeighingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
