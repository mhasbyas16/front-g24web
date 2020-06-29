import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

// Service
import { ModuleService } from '../../../services/security/module.service';

@Component({
  selector: 'app-module-page',
  templateUrl: './module-page.component.html',
  styleUrls: ['./module-page.component.scss']
})
export class ModulePageComponent implements OnInit {
  // title
  breadcrumb = 'Module';
  title = 'Module Data';

  // spinner
  spinner = false;

  // list
  contents = null;
  modules = null;
  subModules = null;

  // dialog
  modalAddDialog: boolean = false;
  modalEditDialog: boolean = false;
  modalEdit: boolean = false;
  modalDeleteDialog: boolean = false;

  // dialog  form
  formSub: FormGroup = null;
  formMain: FormGroup = null;
  form: FormGroup = null;



  constructor(
    // app
    private moduleService: ModuleService,
    // ng
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.mainLoading();
    this.moduleOption();

    //
  }
  // reference loading
  masterLoading() {
    return new Observable(observer => {

    });
  }

  // loading module option
  moduleOption() {
    const mainModules = [];
    this.moduleService.list('?_hash=1').subscribe((response: any) => {
      if (response !== false) {
        // tslint:disable-next-line:only-arrow-functions
        response.forEach(function(row) {
          if (row.type === 'module') {
            mainModules.push({code: row.code, name: row.name, type: row.type, _id: row._id, _hash: row._hash});
          }
          return;
        });
        // tslint:disable-next-line:no-console
        console.debug(mainModules);
        this.modules = mainModules;
      }
    });
  }

  // loading data
  mainLoading() {
    const arrayModule = [];
    const arraySubModule = [];
    this.moduleService.list().subscribe((response: any) => {
      if (response === false) {
        if (this.moduleService.message() !== '') {
          this.toastr.error(this.moduleService.message(), this.title);
          return;
        }
      }
      response.forEach(function(row) {
        if (row.type === 'module') {
          arrayModule.push({code: row.code, name: row.name, type: row.type, _id: row._id});
        } else {
          arraySubModule.push(row);
        }
        return;
      });

      this.contents = arrayModule;
      this.subModules = arraySubModule;
      this.toastr.success('Success loading ' + this.contents.length + ' record(s) and', this.title);
    });
  }


  // modal add
  mainAdd() {
    this.formSub = new FormGroup({
      code: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.pattern(/^[A-Z0-9-]*$/)]),
      code_validation: new FormControl('unique:code'),
      name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      type: new FormControl('sub-module', [Validators.required, Validators.maxLength(15) ]),
      module: new FormControl('', Validators.required),
      module_encoded: new FormControl('base64')

    });
    this.formMain = new FormGroup({
      code: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.pattern(/^[A-Z0-9-]*$/)]),
      code_validation: new FormControl('unique:code'),
      name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      type: new FormControl('module', [Validators.required, Validators.maxLength(15) ])

    });
    this.modalAddDialog = true;
    
    console.debug('mainAdd', this.modalAddDialog);
  }

  // Submit new data to server
  mainAddSubmit() {
    let data: any;
    if (!this.formMain.valid) {
      if (!this.formSub.valid) {
        this.toastr.error('Form not complete yet', this.title);
        return;
      } else {
        data = this.formSub.getRawValue();
      }
    } else {
      data = this.formMain.getRawValue();
    }

    console.debug('submitted data', data);

    this.spinner = true;
    this.moduleService.add(data).subscribe((response: any) => {
      this.spinner = false;
      this.modalAddDialog = false;
      if (response === false) {
        if (this.moduleService.message() !== '') {
          this.toastr.error(this.moduleService.message(), this.title);
          return;
        }
      }
      this.contents = response;
      this.toastr.success('Data addition was success', this.title);
      this.moduleOption();
      this.mainLoading();
    });
  }

  // modal edit call
  subEdit(row) {
    this.form = new FormGroup({
      _id: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.pattern(/^[A-Z0-9-]*$/)]),
      code_validation: new FormControl('unique:code'),
      name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      type: new FormControl('sub-module', [Validators.required, Validators.maxLength(15) ]),
      module: new FormControl('', Validators.required),
      module_encoded: new FormControl('base64')
    });

    console.debug('dataEdit', row);

    this.form.patchValue(row);
    this.form.controls.module.setValue(btoa(JSON.stringify(row.module)));
    this.modalEdit = true;
    this.modalEditDialog = true;
  }

  mainEdit(row) {
    this.form = new FormGroup({
      _id: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.pattern(/^[A-Z0-9-]*$/)]),
      code_validation: new FormControl('unique:code'),
      name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      type: new FormControl('sub-module', [Validators.required, Validators.maxLength(15) ])
    });

    console.debug('dataEdit', row);

    this.form.patchValue(row);
    this.modalEdit = false;
    this.modalEditDialog = true;
  }

  // post updated data to server
  mainEditSubmit() {
    if (!this.form.valid) {
      this.toastr.error('Form not complete yet', this.title);
      return;
    }

    let data = this.form.getRawValue();
    this.spinner = true;
    this.moduleService.update(data).subscribe((response: any) => {
      this.spinner = false;
      this.modalEditDialog = false;
      if (response === false) {
        if (this.moduleService.message() !== '') {
          this.toastr.error(this.moduleService.message(), this.title);
          return;
        }
      }
      this.modules = response;
      this.toastr.success('Data modification was success', this.title);
      this.modalEdit = false;
      this.moduleOption();
      this.mainLoading();
    });
  }


  mainDelete(row) {
    this.form = new FormGroup({
      _id: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.pattern(/^[A-Z0-9-]*$/)])
    });

    this.form.patchValue(row);
    console.debug('delete data', row);
    this.modalDeleteDialog = true;
  }

  // Submit delete data
  mainDeleteSubmit() {
    if (!this.form.valid) {
      this.toastr.error('Form not complete yet', this.title);
      return;
    }

    const data = this.form.getRawValue();
    this.spinner = true;
    this.moduleService.delete(data).subscribe((response: any) => {
      this.spinner = false;
      this.modalDeleteDialog = false;
      if (response === false) {
        if (this.moduleService.message() !== '') {
          this.toastr.error(this.moduleService.message(), this.title);
          return;
        }
      }
      this.contents = response;
      this.toastr.success('Data modification was success', this.title);
      this.moduleOption();
      this.mainLoading();
    });
   // console.debug('delete data', row);
   // this.confirmation.confirmation("Confirm for deletion", "Delete record?");
  }

  // detail modal add
  detailAdd(form) {
    /*this.form = new FormGroup({
      _id: new FormControl(""),
      name: new FormControl("", [Validators.required, Validators.max(50), Validators.pattern(/^[a-zA-Z0-9 ]*$/)]),
      username: new FormControl("", [Validators.required, Validators.max(10), Validators.pattern(/^[a-zA-Z0-9]*$/)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      phone: new FormControl("", [Validators.required, Validators.maxLength(20)]),
      role: new FormControl("", Validators.required)
    });*/
  }

  detailAddSubmit() {

  }

  detailEdit(form, row) {
    /*this.form = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.max(50), Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]*$/)]),
      code: new FormControl("", [Validators.required, Validators.max(10), Validators.pattern(/^[a-zA-Z0-9]*$/)])
    });*/
  }

  detailEditSubmit() {

  }

  detailDeleteSubmit(row) {

  }

}
