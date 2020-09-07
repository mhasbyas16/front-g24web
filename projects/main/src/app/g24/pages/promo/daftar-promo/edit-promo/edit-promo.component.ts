import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from "@angular/common";
import { ClrWizard } from '@clr/angular';
import { Select2OptionData } from 'ng-select2';
import { ToastrService } from 'ngx-toastr';
import { Options } from 'select2';

// Services
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { UnitService } from '../../../../services/system/unit.service';
import { ProductCategoryService } from '../../../../services/product/product-category.service';


@Component({
  selector: 'app-edit-promo',
  templateUrl: './edit-promo.component.html',
  styleUrls: ['./edit-promo.component.scss'],
  providers:[DatePipe],
})
export class EditPromoComponent implements OnInit {
  section1_edit:FormGroup = null;


  selectdistro:boolean = false;
  selectProduct:boolean = false;
  editPromosi:boolean = false;
  inputKuota:boolean = false;
  kuotaProduk:boolean = false;

  nikUser:any;
  dataEdit:any;
  valuePC:string[]=[];
  valueUnit:string[]=[];
  public options:Options;
  public options2:Options;

  // select2
  unit:Array<Select2OptionData>;
  productCategory:Array<Select2OptionData>=[];
  constructor(
    private datePipe: DatePipe,
    private sessionService: SessionService,
    private unitService:UnitService,
    private productCategoryService:ProductCategoryService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.form();
    
  }

  openEdit(_hash:any){
    // Maker
    this.nikUser = this.sessionService.getUser();
    this.nikUser = {"_hash":btoa(JSON.stringify(this.nikUser))} ;
    
    this.options2 ={
      multiple: true,
      theme: 'classic',
      closeOnSelect: false,
      width: '300'
    };
    this.options = {
      multiple: true,
      theme: 'classic',
      closeOnSelect: false,
      width: '300'
    };

    this.dataEdit = JSON.parse(atob(_hash));
    this.addToForm(this.dataEdit);
    console.debug(this.dataEdit,"data Edit");
    this.editPromosi = true;
  }

  addToForm(data:any){
    this.valueUnit.splice(0);
    this.valuePC.splice(0);
    this.productCategory.splice(0);
    this.section1_edit.patchValue({
      name: data.name,
      startDate : data.startDate,
      endDate : data.endDate,
      typeQuota: data.typeQuota,
      quota : data.quota
    });
    this.selectKuota(data.typeQuota);

    if (data.units == '1') {
      this.section1_edit.patchValue({units:'1'})
      this.select2Distro('1');
    }else{
      let Unit=[];
      let hash:any;
      for (let isi of data.units) {
        hash = btoa(JSON.stringify(isi));
        Unit.push({id:hash,text:isi.nama});
        this.valueUnit.push(hash);
      }
      this.unit = Unit;
      this.section1_edit.patchValue({units:'pd'})
      this.select2Distro('pd');
    }

    if (data['product-category'] == '1') {
      this.section1_edit.patchValue({'product-category':'1'})
      this.select2Product('1');
    }else{
      let PC=[];
      let hash:any ;
      this.productCategoryService.list('?_hash=1').subscribe((response:any)=>{
        if (response == false) {
          this.toastrService.error("Get Product Category Error");
          return;
        }
        for (let res of response) {
          PC.push({id:res._hash,text:res.name});

          for (let isi of data['product-category']) {
            if (res.code == isi.code) {
              this.valuePC.push(res._hash);
            }
          }          
        }
        this.productCategory = PC ;
      })
      
      this.section1_edit.patchValue({'product-category':'pp'});
      this.select2Product('pp');
      // looping ke select2
      //   'pickProduct-category' : new FormControl (""),
    }
    console.debug(this.valuePC,"value PC")
  }

  select2Distro(val){
    if (val == 'pd'){
      this.selectdistro = true;
    }else{
      this.selectdistro = false;
      console.debug(val,"isi select")
    }
  }

  select2Product(val){
    if (val == 'pp'){
      this.selectProduct = true;
    }else{
      this.selectProduct = false;
    }
    // this.section1_edit.patchValue({typeQuota:""})
  }
  selectKuota(val){
    if (val == '0') {
      this.inputKuota = false;
      this.kuotaProduk = false;
    }else if (val == '1') {
      this.inputKuota = true;
      this.kuotaProduk = false;
    }else if (val == '2'){
      this.inputKuota = false;
      this.kuotaProduk = true;
    }
  }

  // form
  form(){
    this.section1_edit = new FormGroup({
      name : new FormControl ("", Validators.required),
      startDate : new FormControl ("", Validators.required),
      endDate : new FormControl ("", Validators.required),
      units : new FormControl ("", Validators.required),
      pickUnits : new FormControl (""),
      'product-category' : new FormControl ("", Validators.required),
      'pickProduct-category' : new FormControl (""),
      typeQuota : new FormControl ("", Validators.required),  
      quota : new FormControl (""),
      // maker : new FormControl (this.nikUser._hash, Validators.required),
      // maker_encoded : new FormControl ("base64"),
      // makerDate: new FormControl(this.datePipe.transform(Date.now(),'MM/dd/yyyy'), Validators.required),
      // makerTime: new FormControl(this.datePipe.transform(Date.now(),'h:mm:ss a'), Validators.required),
      // approval : new FormControl (""),
      // approvalDate: new FormControl(""),
      // approvalTime: new FormControl(""),
    });
  }
}
