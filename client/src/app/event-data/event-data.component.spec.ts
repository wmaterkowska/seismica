import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDataComponent } from './event-data.component';

describe('EventDataComponent', () => {
  let component: EventDataComponent;
  let fixture: ComponentFixture<EventDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventDataComponent]
    });
    fixture = TestBed.createComponent(EventDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
