import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleService } from '../../../services/security/role.service';
import { UserService } from '../../../services/security/user.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DialogComponent } from '../../../supportings/dialog/dialog.component';

@Component({
  selector: 'app-role-page',
  templateUrl: './role-page.component.html',
  styleUrls: ['./role-page.component.scss']
})
export class RolePageComponent implements OnInit {
  //title
  breadcrumb = "Roles"
  title = "Roles Data"

  // spinner 
  spinner = false;

  //list
  roles = null;
  contents = null;

  // dialog
  modalAddDialog: boolean = false;
  modalEditDialog: boolean = false;
  modalDeleteDialog: boolean = false;

  // dialog  form
  form: FormGroup = null;

  // confirmation dialog
  @ViewChild(DialogComponent) confirmation: DialogComponent


  constructor(
    //app
    private roleService: RoleService,
    private mainService: UserService,

    private toastr: ToastrService,
  ) {  }

  ngOnInit(): void {
    // this.dummy();
    this.mainLoading();

    /*this.roleService.list("?_hash=1").subscribe((response: any) => {
      if (response != false) {
        this.roles = response;
      }
    });*/
    this.masterLoading().subscribe(status => {

    });
  }
  // reference loading
  masterLoading() {
    return new Observable(observer => {

    });
  }

  // loading data
  mainLoading() {
    this.roleService.list().subscribe((response: any) => {
      if (response === false){
        if (this.roleService.message() !== '') {
          this.toastr.error(this.roleService.message(), this.title);
          return;
        }
      }
      this.roles = response;
      this.toastr.success('Succsess loading ' + this.roles.length + ' record(s)', this.title);
    });
  }

  // modal add 
  mainAdd() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.pattern(/^[a-zA-Z]*$/)]),
      name_validation: new FormControl('unique:name')
    });
    this.modalAddDialog = true;
    // tslint:disable-next-line:no-console
    console.debug('mainAdd', this.modalAddDialog);
  }

  // Submit new data to server
  mainAddSubmit() {
    if (!this.form.valid) {
      this.toastr.error('Form not complete yet', this.title);
      return;
    }

    let data = this.form.getRawValue();
    console.debug('submitted data', data);

    this.spinner = true;
    this.roleService.add(data).subscribe((response: any) => {
      this.spinner = false;
      this.modalAddDialog = false;
      if (response === false) {
        if (this.roleService.message() !== "") {
          this.toastr.error(this.roleService.message(), this.title);
          return;
        }
      }
      this.roles = response;
      this.toastr.success("Data addition was success", this.title);
      this.mainLoading();
    });
  }

  // modal edit call
  mainEdit(row) {
    this.form = new FormGroup({
      _id: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required, Validators.maxLength(15), Validators.pattern(/^[a-zA-Z]*$/)]),
      name_validation: new FormControl("unique:name")
    });

    console.debug("dataEdit", row);

    this.form.patchValue(row);
    //this.form.controls["role"].setValue(btoa(JSON.stringify(row.role)));

    this.modalEditDialog = true;
  }

  // post updated data to server
  mainEditSubmit() {
    if (!this.form.valid) {
      this.toastr.error("Form not complete yet", this.title);
      return;
    }

    let data = this.form.getRawValue();
    this.spinner = true;
    this.roleService.update(data).subscribe((response: any) => {
      this.spinner = false;
      this.modalEditDialog = false;
      if (response === false) {
        if (this.roleService.message() !== "") {
          this.toastr.error(this.roleService.message(), this.title);
          return;
        }
      }
      this.contents = response;
      this.toastr.success("Data modification was success", this.title);
      this.mainLoading();
    });
  }

  mainDelete(row) {
    this.form = new FormGroup({
      _id: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required, Validators.maxLength(15), Validators.pattern(/^[a-zA-Z]*$/)])
    });

    this.form.patchValue(row);    
    console.debug("delete data", row);
    this.modalDeleteDialog = true;
  }

  // Submit delete data
  mainDeleteSubmit() {
    if (!this.form.valid) {
      this.toastr.error("Form not complete yet", this.title);
      return;
    }

    let data = this.form.getRawValue();
    this.spinner = true;
    this.roleService.delete(data).subscribe((response: any) => {
      this.spinner = false;
      this.modalDeleteDialog = false;
      if (response === false) {
        if (this.roleService.message() !== "") {
          this.toastr.error(this.roleService.message(), this.title);
          return;
        }
      }
      this.contents = response;
      this.toastr.success("Data modification was success", this.title);
      this.mainLoading();
    });
    
    //console.debug("delete data", row);

    ///this.confirmation.confirmation("Confirm for deletion", "Delete record?");
  }

  // detail modal add 
  detailAdd(form) {
    this.form = new FormGroup({
      _id: new FormControl(""),
      name: new FormControl("", [Validators.required, Validators.max(50), Validators.pattern(/^[a-zA-Z0-9 ]*$/)]),
      username: new FormControl("", [Validators.required, Validators.max(10), Validators.pattern(/^[a-zA-Z0-9]*$/)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      phone: new FormControl("", [Validators.required, Validators.maxLength(20)]),
      role: new FormControl("", Validators.required)
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
