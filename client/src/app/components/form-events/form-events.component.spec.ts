import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEventsComponent } from './form-events.component';

describe('FormEventsComponent', () => {
  let component: FormEventsComponent;
  let fixture: ComponentFixture<FormEventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormEventsComponent]
    });
    fixture = TestBed.createComponent(FormEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
