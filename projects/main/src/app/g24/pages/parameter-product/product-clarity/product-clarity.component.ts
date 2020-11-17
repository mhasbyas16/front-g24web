import { Component, OnInit, ViewChild } from '@angular/core';
import { DContent } from '../../../decorators/content/pages';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { DataTypeUtil } from '../../../lib/helper/data-type-util';
import { AlphaNumeric } from '../../../lib/helper/alpha-numeric';
import { environment } from 'src/environments/environment';
import { Observable, config } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoadingSpinnerComponent } from '../../../../g24/nav/modal/loading-spinner/loading-spinner.component';

//ALERT
import { ToastrService } from 'ngx-toastr';

//SERVICE
import { ProductClarityService } from '../../../services/product/product-clarity.service';

@Component({
  selector: 'app-product-clarity',
  templateUrl: './product-clarity.component.html',
  styleUrls: ['./product-clarity.component.scss']
})

@DContent(ProductClarityComponent.key)
export class ProductClarityComponent implements OnInit {
static key = EMenuID.PARAM_CLARITY;

search : any = {};
input : any = {};
data_view : any = {};
dataupdate : any = {};

inputUpdate : any = {};

dataclarity : any[] = [];
listclarity : any[] = [];
delete : any[] = [];
uptodate : any[] = [];


modaltambah : boolean = false;
modalupdate : boolean = false;

listdata : any[] = [];


  constructor(private productclarity : ProductClarityService, private toastr : ToastrService) { }
  @ViewChild('spinner',{static:false}) spinner : LoadingSpinnerComponent;
  ngOnInit(): void {
  	let params = "?";
  	this.productclarity.list(params).subscribe(data=>{
  		if(data==false){
  			if(this.productclarity.message()!=""){
  				return;
  			}
  		}
		  this.dataclarity = data;
		  console.log(this.dataclarity.length);
  	})
  }

  SearchData(){
	  this.spinner.SetSpinnerText("Mohon Tunggu...");
	  this.spinner.Open();
  	let params = "?";
  	for(let key in this.search){
  		if(this.search[key]==""||this.search[key]==null)continue;
  			switch (key) {
  				case "code":
  					params += "code="+this.search[key]+"&";
				break;

				case "name":
					params += "name="+this.search[key]+"&";
				break;
  				
  				default:
  					params += key+="="+this.search[key]+"&";
  				break;
  			}
  		}
  		this.productclarity.list(params).subscribe(data=>{
  			if(data==false){
  				if(this.productclarity.message()!=""){
					  this.toastr.info("Data tidak ditemukan","Informasi");
					  this.spinner.Close();
					  this.listclarity = [];
  					return;
  				}
  			}
			  this.listclarity = data;
			  this.toastr.success("Data ditemukan "+data.length,"Sukses");
			  this.spinner.Close();
  		})
  }

  Tambah(){
	  this.modaltambah = true;
	  this.input = {};
  }

  Simpan(){
	this.spinner.SetSpinnerText("Mohon Tunggu...");
	this.spinner.Open();
  	let code = this.input["code"];
	let name = this.input["name"];
	let value = AlphaNumeric.Encode(this.dataclarity.length);
	if(value.length <= 1){
		value = "0"+value;
	}
  	let data = {
  		code : code,
		name : name,
		value : value  
	  }

	  console.log(value);
	  let ff = DataTypeUtil.Encode(data);
	  
	  let params = "?";
	  this.productclarity.list(params).subscribe(data=>{
		  if(data==false){
			  if(this.productclarity.message()!=""){
				  return;
			  }
		  }
		  this.listdata = data;
	  })

	  for(let i = 0; i < this.dataclarity.length; i++){
		  if(this.dataclarity[i].code==code){
			this.toastr.warning("Data code sama","Peringatan");
			this.spinner.Close();
			return;
		  }
		  else if(!code || !name){
			  this.toastr.warning("Kode atau Nama Clarity belum diisi");
			  this.spinner.Close();
			  return;
		  }
	  }

	//   this.toastr.success("Data code tidak sama","Sukses");

		this.productclarity.add(ff).subscribe(data=>{
			if(data==false){
				if(this.productclarity.message()!=""){
					this.toastr.error("Data gagal disimpan","Gagal");
					this.spinner.Close();
					return;
				}
			}

			this.spinner.Close();
			this.toastr.success("Data berhasil ditambah","Sukses");
			this.listclarity = [];
			this.loadData();
			this.modaltambah = false;
			this.SearchData();
		})
  }

  Ubah(){
	this.inputUpdate.name = this.data_view?.name;
	if(!this.data_view){
		this.toastr.warning("Data belum dipilih","Peringatan");
		return;
	}else if(Object.keys(this.data_view).length==0){
		  this.toastr.warning("Data belum dipilih","Peringatan");
		  return;
	  }
  	this.modalupdate = true;
  	this.uptodate = [];
  	this.uptodate.push(this.data_view);
  	for(let i = 0; i < this.uptodate.length; i++){
  		this.dataupdate = this.uptodate[i];
  	}
  }

  Update(){
	this.spinner.SetSpinnerText("Mohon Tunggu...");
	this.spinner.Open();
	if(this.data_view?.name == ""){
		this.toastr.warning("Data name clarity kosong","Peringatan");
		this.spinner.Close();
		return;
	}else if(this.inputUpdate.name == ""){
		this.toastr.warning("Nama clarity belum diisi","Peringatan");
		this.spinner.Close();
		return;
	}
  	for(let i = 0; i < this.uptodate.length; i++){
  		console.log(this.uptodate[i]._id);
  		let data = {
  			_id 	: this.uptodate[i]._id,
  			name 	: this.inputUpdate["name"]
  		}

  		console.log(data);

  		let upd = DataTypeUtil.Encode(data);
  		this.productclarity.update(upd).subscribe(data=>{
  			if(data==false){
  				if(this.productclarity.message()!=""){
					this.toastr.error("Data gagal diubah","Gagal");
					this.spinner.Close();
  					return;
  				}
			  }
			  this.spinner.Close();
  			this.toastr.success("Data berhasil diubah","Sukses");
  			this.listclarity = [];
  			this.loadData();
			this.modalupdate = false;
			this.SearchData();  
  		})
  	}
  }

  Hapus(){
	this.spinner.SetSpinnerText("Mohon Tunggu...");
	this.spinner.Open();
	if(!this.data_view){
		this.toastr.warning("Data belum dipilih","Peringatan");
		this.spinner.Close();
		return;
	}else if(Object.keys(this.data_view).length==0){
		  this.toastr.warning("Data belum dipilih","Peringatan");
		  this.spinner.Close();
		  return;
	  }
  	this.delete = [];
    this.delete.push(this.data_view);
    for(let i = 0; i < this.delete.length; i++){
      let data = {_id : this.delete[i]._id}
      let dlt = DataTypeUtil.Encode(data);
      this.productclarity.delete(dlt).subscribe(data=>{
        if(data==false){
          if(this.productclarity.message()!=""){
			this.toastr.error("Data gagal dihapus","Gagal");
			this.spinner.Close();
            return;
          }
		}
		this.spinner.Close();
        this.toastr.success("Data berhasil dihapus","Sukses");
        this.listclarity = [];
		this.loadData();
		this.SearchData();
      })
    }
  }

  async loadData(){
  	let params = "?";
  	this.productclarity.list(params).subscribe(data=>{
  		if(data==false){
  			if(this.productclarity.message()!=""){
  				return;
  			}
  		}
  		this.dataclarity = data;
  	})
  }

}
