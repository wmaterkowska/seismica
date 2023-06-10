import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormEventsComponent } from './form-events/form-events.component';
import { MapComponent } from './map/map.component';
import { EventDataComponent } from './event-data/event-data.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ComparisonComponent } from './comparison/comparison.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    FormEventsComponent,
    MapComponent,
    EventDataComponent,
    NavbarComponent,
    ComparisonComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
