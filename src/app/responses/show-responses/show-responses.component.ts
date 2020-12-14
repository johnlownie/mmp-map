import { Component, OnInit } from '@angular/core';
import { ResponseModel } from '../response.model';
import { ResponseService } from '../response.service';

@Component({
  selector: 'app-show-responses',
  templateUrl: './show-responses.component.html',
  styleUrls: ['./show-responses.component.css']
})
export class ShowResponsesComponent implements OnInit {

  responses: ResponseModel[];

  constructor(private responseService: ResponseService) { }

  ngOnInit(): void {
    this.responseService.getResponses().subscribe((data) => {
      console.log(data);
      this.responses = data;
    });    
  }
  
  addResponse(): void { }

  deleteResponse(response: ResponseModel) { }

  editResponse(response: ResponseModel) { } 

}
