import { Component, OnInit, ViewChild } from '@angular/core';
import { DContent } from '../../../decorators/content/pages';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { DataTypeUtil } from '../../../lib/helper/data-type-util';
import { environment } from 'src/environments/environment';
import { Observable, config } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoadingSpinnerComponent } from '../../../../g24/nav/modal/loading-spinner/loading-spinner.component';

//ALERT
import { ToastrService } from 'ngx-toastr';

//SERVICE
import { ProductPurityService } from '../../../services/product/product-purity.service';

@Component({
  selector: 'app-product-purity',
  templateUrl: './product-purity.component.html',
  styleUrls: ['./product-purity.component.scss']
})

@DContent(ProductPurityComponent.key)
export class ProductPurityComponent implements OnInit {
static key = EMenuID.PARAM_PURITY;



search : any = {};
input : any = {};
data_view : any = {};
dataupdate : any = {};

datapurity : any[] = [];
listpurity : any[] = [];
delete : any[] = [];
uptodate : any[] = [];


modaltambah : boolean = false;
modalupdate : boolean = false;

modalkonfirm : boolean = false;

inputUpdate : any = {};



  constructor(private purityservice : ProductPurityService, private toastr : ToastrService) { }
  @ViewChild('spinner',{static:false}) spinner : LoadingSpinnerComponent;

  ngOnInit(): void {
  	let params = "?";
  	this.purityservice.list(params).subscribe(data=>{
  		if(data==false){
  			if(this.purityservice.message()!=""){
  				return;
  			}
  		}
  		this.datapurity = data;
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
  		this.purityservice.list(params).subscribe(data=>{
  			if(data==false){
  				if(this.purityservice.message()!=""){
					this.spinner.Close();
					  this.toastr.info("Data tidak ditemukan","Informasi");
					  this.listpurity = [];
  					return;
  				}
			  }
			this.toastr.success("Data ditemukan "+data.length,"Sukses");
			this.spinner.Close();
  			this.listpurity = data;
  		})
  }

  Tambah(){
	  this.modaltambah = true;
	  this.input = {};
  }

  Simpan(){
	this.spinner.SetSpinnerText("Mohon Tunggu...");
	this.spinner.Open();
	let name = this.input.name;
	let validate = /^[0-9]+$/;
	let str = "k"+name;
	let str2 : number = 0;
	str2 = name;
  	let data = {
  		code : str,
  		name : str2,
  		category : "product-purity"
	  }
	  
	  if(!name){
	  this.spinner.Close();
	  this.toastr.warning("Kode belum di isi","Peringatan");
		  return;
	  }else if(!name.match(validate)){
		  this.spinner.Close();
		  this.toastr.info("Harap input dengan angka","Informasi");
		  return;
	  }else if(name.length < 3){
		  this.spinner.Close();
		  this.toastr.info("Input harus 3 digit","Informasi");
		  return;
	  }
	
	  for(let i = 0; i < this.datapurity.length; i++){
		  if(this.datapurity[i].code==str || this.datapurity[i].name==name){
			  this.toastr.warning("Data kode atau nama purity sudah ada","Peringatan");
			  this.spinner.Close();
			  return;
		  }
	  }
  	let ff = DataTypeUtil.Encode(data);
  	this.purityservice.add(ff).subscribe(data=>{
  		if(data==false){
  			if(this.purityservice.message()!=""){
				this.toastr.error("Data gagal disimpan","Gagal");
				this.spinner.Close();
  				return;
  			}
		  }
		this.spinner.Close();
  		this.toastr.success("Data berhasil ditambah","Sukses");
  		this.listpurity = [];
  		this.loadData();
		this.modaltambah = false;
		this.SearchData();  
  	})
  }

  Ubah(){
	this.inputUpdate.name_purity = this.data_view?.name;
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
	let validate = /^[0-9]+$/;
	if(this.data_view?.name == ""){
		this.spinner.Close();
		this.toastr.warning("Nama Purity kosong","Peringatan");
		return;
	}else if(this.inputUpdate.name_purity == ""){
		this.spinner.Close();
		this.toastr.warning("Nama purity belum diisi","Peringatan");
		return;
	}
	else if(!this.inputUpdate.name_purity.match(validate)){
		this.spinner.Close();
		this.toastr.info("Harap input dengan angka","Informasi");
		return;
	}else if(this.inputUpdate.name_purity.length < 3){
		this.spinner.Close();
		this.toastr.info("Info harus 3 digit angka","Informasi");
		return;
	}

	for(let i = 0; i < this.datapurity.length; i++){
		if(this.datapurity[i].name==this.inputUpdate.name_purity){
			this.toastr.warning("Data kode atau nama purity sudah ada","Peringatan");
			this.spinner.Close();
			return;
		}
	}

  	for(let i = 0; i < this.uptodate.length; i++){
  		console.log(this.uptodate[i]._id);
  		let data = {
  			_id 	: this.uptodate[i]._id,
  			name 	: this.inputUpdate["name_purity"],
  			code 	: "k"+this.inputUpdate["name_purity"]
  		}

  		console.log(data);

  		let upd = DataTypeUtil.Encode(data);
  		this.purityservice.update(upd).subscribe(data=>{
  			if(data==false){
  				if(this.purityservice.message()!=""){
					this.toastr.error("Data gagal dirubah","Gagal");
					this.spinner.Close();
  					return;
  				}
			  }
			this.spinner.Close();
  			this.toastr.success("Data berhasil diubah","Sukses");
  			this.listpurity = [];
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
		this.spinner.Close();
		this.toastr.warning("Data belum dipilih","Peringatan");
		return;
	}else if(Object.keys(this.data_view).length==0){
		  this.spinner.Close();
		  this.toastr.warning("Data belum dipilih","Peringatan");
		  return;
	  }
  	this.delete = [];
  	this.delete.push(this.data_view);
  	for(let i = 0; i < this.delete.length; i++){
  		let data = {_id : this.delete[i]._id}
  		let dlt = DataTypeUtil.Encode(data);
  		this.purityservice.delete(dlt).subscribe(data=>{
  			if(data==false){
  				if(this.purityservice.message()!=""){
					this.toastr.error("Data gagal dihapus","Gagal");
					this.spinner.Close();
  					return;
  				}
			  }
			this.spinner.Close();
  			this.toastr.success("Data berhasil dihapus","Sukses");
  			this.listpurity = [];
			this.loadData();
			this.SearchData();  
			this.modalkonfirm = false;
  		})
  	}
  }

  async loadData(){
  	let params = "?";
  	this.purityservice.list(params).subscribe(data=>{
  		if(data==false){
  			if(this.purityservice.message()!=""){
  				return;
  			}
  		}
  		this.datapurity = data;
  	})
  }

}
