import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';
import { MapComponent } from './map/map.component';
import { SearchComponent } from './search/search.component';

import { SearchService } from './search/search.service';

@NgModule({
  declarations: [
    HomeComponent,
    MapComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    SearchService
  ]
})
export class HomeModule { }
