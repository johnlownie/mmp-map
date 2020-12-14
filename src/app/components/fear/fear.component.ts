import { Component, OnInit } from '@angular/core';
import { FearModel } from 'src/app/models/fear.model';

import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-fear',
  templateUrl: './fear.component.html',
  styleUrls: ['./fear.component.css']
})
export class FearComponent implements OnInit {

  fears: FearModel[];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getFears().subscribe((data) => {
      console.log(data);
      this.fears = data;
    });
  }

  addFear(): void {

  }

  deleteUser(fear: FearModel) {

  }

  editUser(fear: FearModel) {

  }

}
