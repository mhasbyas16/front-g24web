import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogComponent } from '../../../../../../../platform/src/app/supportings/dialog/dialog.component';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../services/security/user.service';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from '../../../services/security/role.service';
import { DContent } from '../../../decorators/content/pages';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { UnitService } from '../../../services/system/unit.service';
import { ContentPage } from '../../../lib/helper/content-page';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
@DContent(UserComponent.key)
export class UserComponent implements OnInit {
  // title
  breadcrumb = "User";
  title = "User Data";

  // spinner 
  spinner = false;

  //list
  contents = null;
  roles = null;

  // dialog
  modalAddDialog: boolean = false;
  modalEditDialog: boolean = false;

  // dialog  form
  form: FormGroup = null;
  unitList:any;

  // confirmation dialog
  @ViewChild(DialogComponent) confirmation: DialogComponent;
  constructor(
    //app
    private mainService: UserService,
    private roleService: RoleService,

    //ng
    private toastr: ToastrService,
    private unitService:UnitService
  ) { }

  ngOnInit(): void {
    //this.dummy();
    this.mainLoading();
    this.getUnit();
    this.roleService.list("?_hash=1").subscribe((response: any) => {
      if (response != false) {
        this.roles = response;
      }
    });
    this.masterLoading().subscribe(status => {
      
    });
  }

  getUnit(){
    this.unitService.list("?_hash=1").subscribe((response:any)=>{
      if (response == false) {
        return this.toastr.error("faild get unit");
      }
      this.unitList = response;

    })
  }

  // reference loading
  masterLoading() {
    return new Observable(observer => {

    });
  }

  // loading data
  mainLoading() {
    this.mainService.list().subscribe((response: any) => {
      if (response == false) {
        if (this.mainService.message() != "") {
          this.toastr.error(this.mainService.message(), this.title);
          return;
        }
      }
      this.contents = response;
      this.toastr.success("Success loading " + this.contents.length + " record(s)", this.title);
    });
  }

  // modal add 
  mainAdd() {
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.max(50), Validators.pattern(/^[a-zA-Z0-9 ]*$/)]),
      username: new FormControl("", [Validators.required, Validators.max(10), Validators.pattern(/^[a-zA-Z0-9]*$/)]),
      username_validation: new FormControl("unique:username"),
      email: new FormControl("", [Validators.required, Validators.email]),
      email_validation: new FormControl("unique:email"),
      phone: new FormControl("", [Validators.required, Validators.maxLength(20), Validators.pattern(/^[+0-9]*$/)]),
      phone_validation: new FormControl("unique:phone"),
      password: new FormControl ("",[Validators.required, Validators.minLength(8)]),
      role: new FormControl("", Validators.required),
      role_encoded: new FormControl("base64"),
      unit : new FormControl("", Validators.required),
      unit_encoded: new FormControl("base64")
    });
    this.modalAddDialog = true;
    console.debug("mainAdd", this.modalAddDialog);
  }

  // Submit new data to server
  mainAddSubmit() {
    if (!this.form.valid) {
      this.toastr.error("Form not complete yet", this.title);
      return;
    }



    let data = this.form.getRawValue();
    console.debug("submitted data", data);

    this.spinner = true;
    this.mainService.add(data).subscribe((response: any) => {
      this.spinner = false;
      this.modalAddDialog = false;
      if (response == false) {
        if (this.mainService.message() != "") {
          this.toastr.error(this.mainService.message(), this.title);
          return;
        }
      }
      this.contents = response;
      this.toastr.success("Data addition was success", this.title);
      this.mainLoading();
    });
  }

  // modal edit call
  mainEdit(row) {
    this.form = new FormGroup({
      _id: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required, Validators.max(50), Validators.pattern(/^[a-zA-Z0-9 ]*$/)]),
      username: new FormControl("", [Validators.required, Validators.max(10), Validators.pattern(/^[a-zA-Z0-9]*$/)]),
      username_validation: new FormControl("unique:username"),
      email: new FormControl("", [Validators.required, Validators.email]),
      email_validation: new FormControl("unique:email"),
      phone: new FormControl("", [Validators.required, Validators.maxLength(20), Validators.pattern(/^[+0-9]*$/)]),
      phone_validation: new FormControl("unique:phone"),
      role: new FormControl("", Validators.required),
      role_encoded: new FormControl("base64"),
      unit : new FormControl("", Validators.required),
      unit_encoded: new FormControl("base64")
    });

    console.debug("dataEdit", row);

    this.form.patchValue(row);
    this.form.controls["role"].setValue(btoa(JSON.stringify(row.role)));
    this.form.controls["unit"].setValue(btoa(JSON.stringify(row.unit)));

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
    this.mainService.update(data).subscribe((response: any) => {
      this.spinner = false;
      this.modalEditDialog = false;
      if (response == false) {
        if (this.mainService.message() != "") {
          this.toastr.error(this.mainService.message(), this.title);
          return;
        }
      }
      this.contents = response;
      this.toastr.success("Data modification was success", this.title);
      this.mainLoading();
    });
  }

  // Submit delete data
  mainDeleteSubmit(row: any) {
    console.debug("delete data", row);
    let data = {"_id":row}
    this.mainService.delete(data).subscribe((response:any)=>{
      if (response == false) {
        return this.toastr.error("gagal menghapus data");
      }
      this.ChangeContentArea('10011');
      this.toastr.success("berhasil menghapus data");

    })
  }

  // detail modal add 
  detailAdd(form) {
    this.form = new FormGroup({
      _id: new FormControl(""),
      name: new FormControl("", [Validators.required, Validators.max(50), Validators.pattern(/^[a-zA-Z0-9 ]*$/)]),
      username: new FormControl("", [Validators.required, Validators.max(10), Validators.pattern(/^[a-zA-Z0-9]*$/)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      phone: new FormControl("", [Validators.required, Validators.maxLength(20)]),
      role: new FormControl("", Validators.required),
      unit: new FormControl("", Validators.required)
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
  ChangeContentArea(pageId: string) {
    if (pageId.startsWith("x")) return;
    ContentPage.ChangeContent(pageId, true)
  }

  static key = EMenuID.USER;

}
