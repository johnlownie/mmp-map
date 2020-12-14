import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponsesRoutingModule } from './responses-routing.module';

import { ResponsesComponent } from './responses.component';
import { AddResponseComponent } from './add-response/add-response.component';
import { ShowResponsesComponent } from './show-responses/show-responses.component';

import { ResponseService } from './response.service';

@NgModule({
  declarations: [
    ResponsesComponent,
    AddResponseComponent,
    ShowResponsesComponent
  ],
  imports: [
    CommonModule,
    ResponsesRoutingModule
  ],
  providers: [
    ResponseService
  ]
})
export class ResponsesModule { }
