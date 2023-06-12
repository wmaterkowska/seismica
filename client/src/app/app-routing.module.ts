import { NgModule } from '@angular/core';
import { ComparisonComponent } from './comparison/comparison.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  // { path: '/:eventCleared', component: DashboardComponent },
  { path: 'comparison', component: ComparisonComponent }
]

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
