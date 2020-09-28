import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-example2-page',
  templateUrl: './example2-page.component.html',
  styleUrls: ['./example2-page.component.scss']
})
export class Example2PageComponent implements OnInit {

  isLoading = true;

  constructor() { 
    
  }

  ngOnInit(): void {
    setTimeout(function(){
      this.isLoading = false;
    }, 1000);
  }
  
  

}
