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

//SELECT2

import { Select2OptionData } from 'ng-select2';
import { Option } from 'select2';

//ALERT
import { ToastrService } from 'ngx-toastr';

//SERVICE
import { ProductService } from '../../../services/product/product.service';
import { PrmJualService } from '../../../services/parameter/prm-jual.service';
import { ProductDenomService } from '../../../services/product/product-denom.service';
import { ProductCategoryService } from '../../../services/product/product-category.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-product-denom',
  templateUrl: './product-denom.component.html',
  styleUrls: ['./product-denom.component.scss']
})

@DContent(ProductDenomComponent.key)
export class ProductDenomComponent implements OnInit {
static key = EMenuID.PARAM_DENOM;

//SELECT2
public option : Option;
public exampleData : Array<Select2OptionData>;
tesSelect2 : boolean = false;
datamultiple : any[] = [];
inputmultiple : any = {items:[]};
//----------------------------------------------------------

search : any = {};
input : any = {};
searchProduct : any = {};
data_view : any = {};
dataupdate : any = {};
dataupdatekategori : any[] = [];

inputUpdate : any = {};

select_kategori : any = {};
select_kategori_add : any = {};
select_kategori_upd : any = {};
select_kategori_add_upd : any = {};

datadenom : any[] = [];
listdenom : any[] = [];
delete : any[] = [];
uptodate : any[] = [];
datakategori : any[] = [];
data_kategori : any[]= [];
addkategori : any[] = [];

idproduct : any[] = [];
idprmjual : any[] = [];

listviewdenom : any[] = [];
listviewkat : any[] = [];

modaltambah : boolean = false;
modalupdate : boolean = false;

modalview : boolean = false;

  constructor(private productdenom : ProductDenomService, private toastr : ToastrService,
			  private productkategori : ProductCategoryService, private productservice : ProductService,
			  private prmjualservice : PrmJualService) { }

	@ViewChild('spinner',{static:false}) spinner : LoadingSpinnerComponent;

  ngOnInit(): void {
  	let params = "?";
  	this.productdenom.list(params).subscribe(data=>{
  		if(data==false){
  			if(this.productdenom.message()!=""){
  				return;
  			}
  		}
  		this.datadenom = data;
	  })

	  this.productkategori.list(params).subscribe(data=>{
		  if(data==false){
			  if(this.productkategori.message()!=""){
				  return;
			  }
		  }
		  this.data_kategori = data;
		  for(let i =0; i < data.length; i++){
			  this.datamultiple.push({id:data[i]._id,text:data[i].name});

			}
			this.exampleData = this.datamultiple;
			console.log("Tes",this.exampleData);
		  this.option = {multiple: true}
	  })
	  let num = AlphaNumeric.Encode(this.datadenom.length);
	  console.log(num);
  }

  SearchData(){
	  let params = "?";
	  this.spinner.SetSpinnerText("Mohon Tunggu...");
	  this.spinner.Open();
  		for(let key in this.search){
  		if(this.search[key]==""||this.search[key]==null)continue;
  			switch (key) {
				case "code":
					params += "code="+this.search[key]+"&";
			  	break;

				case "name":
					params += "name="+this.search[key]+"&";
				break;

				case "kategori":
					params += "product-category.name_regex=1&product-category.name="+this.search[key]+"&";
				break;
				
  				default:
  					params += key+="="+this.search[key]+"&";
  				break;
  			}
  		}
  		this.productdenom.list(params).subscribe(data=>{
  			if(data==false){
  				if(this.productdenom.message()!=""){
					  this.spinner.Close();
					  this.toastr.info("Data tidak ditemukan","Informasi");
					  this.listdenom = [];
  					return;
  				}
  			}
			  this.listdenom = data;
			  this.toastr.success("Data ditemukan "+data.length,"Sukses");
			  this.spinner.Close();
		  })
  }

  Tambah(){
	  this.modaltambah = true;
	  this.input = {};
	  this.addkategori = [];
  	let params = "?";
  	this.productkategori.list(params).subscribe(data=>{
  		if(data==false){
  			if(this.productkategori.message()!=""){
  				this.toastr.info("Data tidak ditemukan","Informasi");
  				return;
  			}
  		}
		  this.datakategori = data;
	  })
	  
  }


  TambahKategori(){
	  
	if(!this.select_kategori){
		this.toastr.error("Produk kategori belum dipilih","Gagal");
		return;
	}
	if(Object.keys(this.select_kategori).length==0){
		this.toastr.error("Produk kategori belum dipilih","Gagal");
		return;
	}

	  for(let i = 0; i < this.addkategori.length; i++){
		  if(this.addkategori[i].code==this.select_kategori.code){
			  this.toastr.info("Produk kategori sama","Informasi");
			  return;
		  }
	  }
	  this.addkategori.push(this.select_kategori);
	  console.log(this.select_kategori);
  }

  TambahKategoriUpdate(){
	if(!this.select_kategori_upd){
		this.toastr.error("Produk kategori belum dipilih","Gagal");
		return;
	  }else if(Object.keys(this.select_kategori_upd).length==0){
		this.toastr.error("Produk kategori belum dipilih","Gagal");
		return;
	  }

	for(let i = 0; i < this.dataupdatekategori.length; i++){
		if(this.dataupdatekategori[i].code==this.select_kategori_upd.code){
			this.toastr.info("Produk kategori sama","Informasi");
			return;
		}
	}	
		this.dataupdatekategori.push(this.select_kategori_upd);
  }

  HapusKategori(){
	const id = this.addkategori.indexOf(this.select_kategori_add);
	if(id > -1){
		this.addkategori.splice(id, 1);
	}
  }

  HapusKategoriUpdate(){
	const id = this.dataupdatekategori.indexOf(this.select_kategori_add_upd);
	if(id > -1){
		this.dataupdatekategori.splice(id, 1);
	} 
  }

  Simpan(){
	this.spinner.SetSpinnerText("Mohon Tunggu...");
	this.spinner.Open();
	let code = AlphaNumeric.Encode(this.datadenom.length);
	let name = this.input["name"];
	let value = this.input["value"];
	// let vld = /^[0-9]+$/;  
	if(code.length <= 1){
		code="0"+code;
	}
  	let data = {
  		code : code,
  		name : name,
		value : value,
		value_encoded : "double",
		"product-category" : []  
	  }
	  for(let i = 0; i < this.addkategori.length; i++){
	  data["product-category"].push(this.addkategori[i]);
	  }
	  let ff = DataTypeUtil.Encode(data);
	if(this.addkategori.length <= 0){
		this.toastr.warning("Produk kategori belum ditambah","Peringatan");
		this.spinner.Close();
		return;
	}
	else if(!name || !value){
		this.toastr.warning("Name atau value belum di isi","Peringatan");
		this.spinner.Close();
		return;
	}
	
  	this.productdenom.add(ff).subscribe(data=>{
  		if(data==false){
  			if(this.productdenom.message()!=""){
				this.toastr.error("Data gagal disimpan","Gagal");
				this.spinner.Close();
  				return;
  			}
  		}
		  this.toastr.success("Data berhasil ditambah","Sukses");
		  this.spinner.Close();
  		this.listdenom = [];
  		this.loadData();
		this.modaltambah = false;
		this.SearchData();  
  	})
  }


  Ubah(){

	this.inputUpdate.name_denom = this.data_view?.name;
	this.inputUpdate.value_denom = this.data_view?.value;

	if(!this.data_view){
		this.toastr.warning("Data belum dipilih","Peringatan");
		return;
	}else if(Object.keys(this.data_view).length == 0){
		this.toastr.warning("Data belum dipilih","Peringatan");
		return;
	}
	this.select_kategori_upd = {};
	let params = "?";
	this.dataupdatekategori = [];
  	this.modalupdate = true;
  	this.uptodate = [];
	this.uptodate.push(this.data_view);

  	for(let i = 0; i < this.uptodate.length; i++){
		//   this.inputUpdate = this.uptodate[i];
		  this.dataupdate = this.uptodate[i];
		  this.dataupdatekategori = this.uptodate[i]["product-category"];
  	}
  }

  Update(){

	this.spinner.SetSpinnerText("Mohon Tunggu...");
	this.spinner.Open();

	if(this.data_view?.name == "" || this.data_view?.value == ""){
		this.toastr.warning("Data nama denom atau value denom kosong","Peringatan");
		this.spinner.Close();
		return;
	}else if(this.inputUpdate.name_denom == "" || !this.inputUpdate.value_denom){
		this.toastr.warning("Data nama denom atau value denom belum di isi","Peringatan");
		this.spinner.Close();
		return;
	}

  	for(let i = 0; i < this.uptodate.length; i++){

  		console.log(this.uptodate[i]._id);
  		let data = {
			_id 	: this.uptodate[i]._id,
			name 	: this.inputUpdate.name_denom,
			value 	: this.inputUpdate.value_denom,
			value_encoded : "double",
			"product-category" : []  
  		}

		  console.log(data);
		if(this.dataupdatekategori.length <= 0){
			this.spinner.Close();
			this.toastr.warning("Produk kategori belum ditambah","Peringatan");
			return;
		}
		for(let r = 0; r < this.dataupdatekategori.length; r++){
		data["product-category"].push(this.dataupdatekategori[r]);
		}
		  let upd = DataTypeUtil.Encode(data);
		  upd._trigger = "product:product-denom";
  		this.productdenom.update(upd).subscribe(data=>{
  			if(data==false){
  				if(this.productdenom.message()!=""){
					this.spinner.Close();
					this.toastr.error("Data gagal disimpan","Gagal");
  					return;
  				}
  			}
			  this.toastr.success("Data berhasil diubah","Sukses");
			  this.spinner.Close();
  			this.listdenom = [];
  			this.loadData();
			this.modalupdate = false;
			this.SearchData();  
		})
		
		  
  	}
  }


  Detail(){
	if(!this.data_view){
		this.toastr.warning("Data belum dipilih","Peringatan");
		return;
	}else if(Object.keys(this.data_view).length == 0){
		this.toastr.warning("Data belum dipilih","Peringatan");
		return;
	}
	this.listviewdenom = [];
	this.modalview = true;
	this.listviewdenom.push(this.data_view);
	for(let i = 0; i < this.listviewdenom.length; i++){
		this.listviewkat = this.listviewdenom[i]["product-category"];
	}
  }

  async loadData(){
  	let params = "?";
  	this.productdenom.list(params).subscribe(data=>{
  		if(data==false){
  			if(this.productdenom.message()!=""){
  				return;
  			}
  		}
  		this.datadenom = data;
  	})
  }

}
