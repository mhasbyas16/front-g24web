import { Component, OnInit } from '@angular/core';
import { DContent } from '../../../decorators/content/pages';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { DataTypeUtil } from '../../../lib/helper/data-type-util';
import { AlphaNumeric } from '../../../lib/helper/alpha-numeric';
import { Key } from 'protractor';
import { environment } from 'src/environments/environment';
import { Observable, config } from 'rxjs';
import { HttpClient } from '@angular/common/http';

//ALERT
import { ToastrService } from 'ngx-toastr';

//SERVICE
import { ProductService } from '../../../services/product/product.service';
import { PrmJualService } from '../../../services/parameter/prm-jual.service';
import { ProductDenomService } from '../../../services/product/product-denom.service';
import { ProductCategoryService } from '../../../services/product/product-category.service';

@Component({
  selector: 'app-product-denom',
  templateUrl: './product-denom.component.html',
  styleUrls: ['./product-denom.component.scss']
})

@DContent(ProductDenomComponent.key)
export class ProductDenomComponent implements OnInit {
static key = EMenuID.PARAM_DENOM;


search : any = {};
input : any = {};
searchProduct : any = {};
data_view : any = {};
dataupdate : any = {};
dataupdatekategori : any[] = [];
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
	  })
	  let num = AlphaNumeric.Encode(this.datadenom.length);
	  console.log(num);
	//   let str = num.substring(0,1);
	//   if(this.datadenom.length > 15){
	// 	  let it = str + 1;
	// 	  console.log(it);
	//   }
  }

  SearchData(){
  	let params = "?";
  	for(let key in this.search){
  		if(this.search[key]==""||this.search[key]==null)continue;
  			switch (key) {
  				case "kategori":
  					params += "product-category.code="+this.search[key].code+"&";
				break;
				
				case "code":
					params += "code="+this.search[key].code+"&";
			  	break;
  				
  				default:
  					params += key+="="+this.search[key]+"&";
  				break;
  			}
  		}
  		this.productdenom.list(params).subscribe(data=>{
  			if(data==false){
  				if(this.productdenom.message()!=""){
					  this.toastr.info("Data tidak ditemukan","Informasi");
					  this.listdenom = [];
  					return;
  				}
  			}
  			this.listdenom = data;
  		})
  }

  Tambah(){
	  this.modaltambah = true;
	  this.input = {};
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
	  
	if(Object.keys(this.select_kategori).length==0){
		this.toastr.warning("Produk kategori belum dipilih","Peringatan");
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
		"product-category" : []  
	  }
	  for(let i = 0; i < this.addkategori.length; i++){
	  data["product-category"].push(this.addkategori[i]);
	  }
	  let ff = DataTypeUtil.Encode(data);
	if(this.addkategori.length <= 0){
		this.toastr.warning("Produk kategori belum ditambah","Peringatan");
		return;
	}
	else if(!name || !value){
		this.toastr.warning("Name atau value belum di isi","Peringatan");
		return;
	}
	// this.toastr.success("Data berhasil","Sukses");
  	this.productdenom.add(ff).subscribe(data=>{
  		if(data==false){
  			if(this.productdenom.message()!=""){
  				return;
  			}
  		}
  		this.toastr.success("Data berhasil ditambah","Sukses");
  		this.listdenom = [];
  		this.loadData();
  		this.modaltambah = false;
  	})
  }


  Ubah(){
	if(Object.keys(this.data_view).length == 0){
		this.toastr.warning("Data belum dipilih","Peringatan");
		return;
	}
	this.select_kategori_upd = {};
	let params = "?";
	this.dataupdate = {};
	this.dataupdatekategori = [];
  	this.modalupdate = true;
  	this.uptodate = [];
	this.uptodate.push(this.data_view);

  	for(let i = 0; i < this.uptodate.length; i++){
		  this.dataupdate = this.uptodate[i];
		  this.dataupdatekategori = this.uptodate[i]["product-category"];
  	}
  }

  Update(){

	// let params = "?";
	// //LIST PRODUCT
	// this.productservice.list(params).subscribe(data=>{
	// 	if(data==false){
	// 		if(this.productservice.message()!=""){
	// 			return;
	// 		}
	// 	}
	// 	this.idproduct = data;
	// })

	// //LIST PARAM_JUAL
	// this.prmjualservice.list(params).subscribe(data=>{
	// 	if(data==false){
	// 		if(this.prmjualservice.message()!=""){
	// 			return;
	// 		}
	// 	}
	// 	this.idprmjual = data;
	// })


  	for(let i = 0; i < this.uptodate.length; i++){

  		console.log(this.uptodate[i]._id);
  		let data = {
			_id 	: this.uptodate[i]._id,
			name 	: this.dataupdate["name"],
			value 	: this.dataupdate["value"],
			"product-category" : []  
  		}

		//   if(this.uptodate[i]._id==this.idproduct[i]["product-denom"]._id){
		// 	  this.toastr.info("Data sama","Informasi");
		//   }
		  console.log(data);
		if(this.dataupdatekategori.length <= 0){
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
  					return;
  				}
  			}
  			this.toastr.success("Data berhasil diubah","Sukses");
  			this.listdenom = [];
  			this.loadData();
  			this.modalupdate = false;
		})
		
		  
  	}
  }


  Detail(){
	if(Object.keys(this.data_view).length == 0){
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
