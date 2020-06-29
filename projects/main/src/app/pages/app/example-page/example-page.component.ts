import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { DialogComponent } from 'projects/platform/src/app/supportings/dialog/dialog.component';

@Component({
  selector: 'app-example-page',
  templateUrl: './example-page.component.html',
  styleUrls: ['./example-page.component.scss']
})
export class ExamplePageComponent implements OnInit {

  // title
  title = "List Product";

  //list
  contents = null;

  // dialog
  modalAddDialog:boolean = false;
  modalEditDialog:boolean = false;

  // dialog  form
  form = null;

  // confirmation dialog
  @ViewChild(DialogComponent) confirmation:DialogComponent;

  constructor(
  ) { }

  dummy() {
    this.contents = [
      { id: 1, name: "A", creation: "2020-04-02", color: "#34567" },
      { id: 1, name: "B", creation: "2020-04-02", color: "#34567" },
      { id: 1, name: "C", creation: "2020-04-02", color: "#34567" },
      { id: 1, name: "D", creation: "2020-04-02", color: "#34567" },
      { id: 1, name: "E", creation: "2020-04-02", color: "#34567" },
      { id: 1, name: "F", creation: "2020-04-02", color: "#34567" },
      { id: 1, name: "G", creation: "2020-04-02", color: "#34567" },
      { id: 1, name: "H", creation: "2020-04-02", color: "#34567" },
      { id: 1, name: "I", creation: "2020-04-02", color: "#34567" },
      { id: 1, name: "J", creation: "2020-04-02", color: "#34567" },
      { id: 1, name: "K", creation: "2020-04-02", color: "#34567" },
      { id: 1, name: "L", creation: "2020-04-02", color: "#34567" },
      { id: 1, name: "M", creation: "2020-04-02", color: "#34567" },
      { id: 1, name: "N", creation: "2020-04-02", color: "#34567" },
      { id: 1, name: "O", creation: "2020-04-02", color: "#34567" },
      { id: 1, name: "P", creation: "2020-04-02", color: "#34567" },
      { id: 1, name: "Q", creation: "2020-04-02", color: "#34567" },
      { id: 1, name: "R", creation: "2020-04-02", color: "#34567" },
      { id: 1, name: "S", creation: "2020-04-02", color: "#34567" },
      { id: 1, name: "T", creation: "2020-04-02", color: "#34567" },
      { id: 1, name: "U", creation: "2020-04-02", color: "#34567" },
      { id: 1, name: "V", creation: "2020-04-02", color: "#34567" },
      { id: 1, name: "W", creation: "2020-04-02", color: "#34567" },
      { id: 1, name: "X", creation: "2020-04-02", color: "#34567" },
      { id: 1, name: "Y", creation: "2020-04-02", color: "#34567" },
      { id: 1, name: "Z", creation: "2020-04-02", color: "#34567" },
    ];
  }

  ngOnInit(): void {
    this.dummy();
    this.masterLoading().subscribe(status => {
      this.mainLoading();
    });
  }

  // reference loading
  masterLoading() {
    return new Observable(observer => {
      
    });
  }

  // loading data
  mainLoading() {

  }

  // modal add 
  mainAdd() {
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.max(50), Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]*$/)]),
      code: new FormControl("", [Validators.required, Validators.max(10), Validators.pattern(/^[a-zA-Z0-9]*$/)])
    }); 
    this.modalAddDialog = true;
    console.debug("mainAdd", this.modalAddDialog);
  }

  // Submit new data to server
  mainAddSubmit() {
    this.modalAddDialog = false;
  }

  // modal edit call
  mainEdit(row) {
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.max(50), Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]*$/)]),
      code: new FormControl("", [Validators.required, Validators.max(10), Validators.pattern(/^[a-zA-Z0-9]*$/)])
    });    
    console.debug("dataEdit", row);
  }

  // post updated data to server
  mainEditSubmit() {

  }

  // Submit delete data
  mainDeleteSubmit(row:any) {

  }

  // detail modal add 
  detailAdd(form) {
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.max(50), Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]*$/)]),
      code: new FormControl("", [Validators.required, Validators.max(10), Validators.pattern(/^[a-zA-Z0-9]*$/)])
    }); 
  }

  detailAddSubmit() {

  }

  detailEdit(form, row) {
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.max(50), Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]*$/)]),
      code: new FormControl("", [Validators.required, Validators.max(10), Validators.pattern(/^[a-zA-Z0-9]*$/)])
    }); 
  }

  detailEditSubmit() {

  }

  detailDeleteSubmit(row) {

  }
}
