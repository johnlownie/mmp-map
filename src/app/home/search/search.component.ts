import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SearchModel } from 'src/app/home/search/search.model';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchForm: FormGroup;
  representative: SearchModel = new SearchModel();
  hideCard: boolean = true;

  constructor(private formBuilder: FormBuilder, private searchService: SearchService) {
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
    
    this.searchService.getRepresentative(postalCode).subscribe(data => {
      if (data !== undefined) {
        this.representative = data;
        this.hideCard = false;
      }
    });
  }

  onReset() {
    this.representative = new SearchModel();
    this.hideCard = true;
    this.searchForm.reset();
  }

}
