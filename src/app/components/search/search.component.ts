import { Component, Input, OnInit } from '@angular/core';
import { RepresentativeModel } from 'src/app/models/representative.model';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchForm: FormGroup;
  representative: RepresentativeModel = new RepresentativeModel();
  hideCard: boolean = true;

  constructor(private formBuilder: FormBuilder, private dataService: DataService) {
    // let postalCodePattern = "^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$";
    let postalCodePattern = "^[A-Za-z][0-9][A-Za-z][ -]?[0-9][A-Za-z][0-9]$";
    this.searchForm = formBuilder.group({
      postalCode: [ '', [ Validators.required, Validators.pattern(postalCodePattern) ] ]
    });
  }

  ngOnInit(): void {
  }

  onSearch(): void {
    this.hideCard = true;

    let postalCode = this.searchForm.value.postalCode.replace(/\s/g,'');
    
    this.dataService.getRepresentative(postalCode).subscribe(data => {
      if (data !== undefined) {
        this.representative = data;
        this.hideCard = false;
      }
    });
  }

  onReset() {
    this.representative = new RepresentativeModel();
    this.hideCard = true;
    this.searchForm.reset();
  }

}
