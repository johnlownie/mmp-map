import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResponsesComponent } from './responses.component';
import { ShowResponsesComponent } from './show-responses/show-responses.component';

const routes: Routes = [
  { path: '', component: ShowResponsesComponent },
  { path: '**', component: ResponsesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResponsesRoutingModule { }
