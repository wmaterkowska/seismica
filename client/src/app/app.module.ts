import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormEventsComponent } from './components/form-events/form-events.component';
import { MapComponent } from './components/map/map.component';
import { EventDataComponent } from './components/event-data/event-data.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ComparisonComponent } from './components/comparison/comparison.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EarthquakeCardComponent } from './components/earthquake-card/earthquake-card.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    FormEventsComponent,
    MapComponent,
    EventDataComponent,
    NavbarComponent,
    ComparisonComponent,
    DashboardComponent,
    EarthquakeCardComponent,
    FooterComponent
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
