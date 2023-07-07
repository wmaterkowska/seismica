import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarthquakeCardComponent } from './earthquake-card.component';

describe('EarthquakeCardComponent', () => {
  let component: EarthquakeCardComponent;
  let fixture: ComponentFixture<EarthquakeCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EarthquakeCardComponent]
    });
    fixture = TestBed.createComponent(EarthquakeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
