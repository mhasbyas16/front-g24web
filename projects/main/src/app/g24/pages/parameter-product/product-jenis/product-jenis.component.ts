import { Component, OnInit } from '@angular/core';
import { DContent } from '../../../decorators/content/pages';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { DataTypeUtil } from '../../../lib/helper/data-type-util';
import { environment } from 'src/environments/environment';
import { Observable, config } from 'rxjs';
import { HttpClient } from '@angular/common/http';

//ALERT
import { ToastrService } from 'ngx-toastr';

//SERVICE
import { ProductJenisService } from '../../../services/product/product-jenis.service';
import { ProductCategoryService } from '../../../services/product/product-category.service';


@Component({
  selector: 'app-product-jenis',
  templateUrl: './product-jenis.component.html',
  styleUrls: ['./product-jenis.component.scss']
})

@DContent(ProductJenisComponent.key)
export class ProductJenisComponent implements OnInit {
static key = EMenuID.PARAM_JENIS;

search : any = {};
input : any = {};
data_view : any = {};
dataupdate : any = {};
select_kategori : any = {};
select_kategori_add : any = {};
select_kategori_upd : any = {};
select_kategori_add_upd : any = {};

datajenis : any[] = [];
datakategori : any[] = [];
data_kategori : any[] = [];

listjenis : any[] = [];
listviewjenis : any[] = [];
listviewkat : any[] = [];
detailkategori : any [] = [];
delete : any[] = [];
uptodate : any[] = [];

addkategori : any[] = [];
dataupdatekategori : any[] = [];


modaltambah : boolean = false;
modalupdate : boolean = false;

modalview : boolean = false;


  constructor(private jenisservice : ProductJenisService, private toastr : ToastrService,
  			  private kategoriservice : ProductCategoryService) { }

  ngOnInit(): void {
  	let params = "?";
  	this.jenisservice.list(params).subscribe(data=>{
  		if(data==false){
  			if(this.jenisservice.message()!=""){
  				return;
  			}
  		}
  		this.datajenis = data;
	  })
	  
	  this.kategoriservice.list(params).subscribe(data=>{
		  if(data==false){
			  if(this.kategoriservice.message()!=""){
				  return;
			  }
		  }
		  this.datakategori = data;
	  })
  }

  SearchData(){
	  let params = "?";
	if(!this.search["kategori"]){
  	for(let key in this.search){
  		if(this.search[key]==""||this.search[key]==null)continue;
  			switch (key) {
  				case "code":
  					params += "code="+this.search[key].code+"&";
				break;

				// case "kategori":
				// 	params += "product-category.code="+this.search[key].code+"&";
				// break;
  				
  				default:
  					params += key+="="+this.search[key]+"&";
  				break;
  			}
  		}
  		this.jenisservice.list(params).subscribe(data=>{
  			if(data==false){
  				if(this.jenisservice.message()!=""){
					  this.toastr.info("Data tidak ditemukan","Informasi");
					  this.listjenis = [];
  					return;
  				}
  			}
  			this.listjenis = data;
			for(let i =0; i < this.listjenis.length; i++){
			this.detailkategori = this.listjenis[i];
			console.log(this.detailkategori["product-category"]);
			}
		  })

		  return;
		}

		this.jenisservice.list(params+"product-category.name_regex=1&product-category.name="+this.search["kategori"]).subscribe(data=>{
			if(data==false){
				if(this.jenisservice.message()!=""){
					this.toastr.info("Data tidak ditemukan","Informasi");
					this.listjenis = [];
					return;
				}
			}
			this.listjenis = data;
			for(let i =0; i < this.listjenis.length; i++){
			this.detailkategori = this.listjenis[i];
			console.log(this.detailkategori["product-category"]);
			}
		})



  }

  Tambah(){
	  this.modaltambah = true;
	  this.addkategori = [];
	  this.input = [];
  	let params = "?";
  	this.kategoriservice.list(params).subscribe(data=>{
  		if(data==false){
  			if(this.kategoriservice.message()!=""){
  				this.toastr.info("data tidak ditemukan","Informasi");
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
	  for(let i = 0; i < this.addkategori.length; i++){
		  if(this.addkategori[i].code==this.select_kategori.code){
			  this.toastr.info("Data produk kategori sama","Informasi");
			  return;
		  }
	  }
	  this.addkategori.push(this.select_kategori);
  }

  TambahKategoriUpdate(){
	  for(let i = 0; i < this.dataupdatekategori.length; i++){
		  if(this.dataupdatekategori[i].code==this.select_kategori_upd.code){
			  this.toastr.info("Data produk kategori sama","Informasi");
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
  	let code = this.input["code"];
	let name = this.input["name"];
	let validate = /^[a-zA-Z ]+$/;  
  	// let kategori = this.input["name_kat"];
  	
	  
	  if(!code || !name){
		  this.toastr.warning("Kode atau nama belum di isi","Peringatan");
		  return;
	  }else if(this.addkategori.length <= 0){
		  this.toastr.warning("Produk kategori belum ditambahkan","Peringatan");
		  return;
	  }else if(!code.match(validate)){
		this.toastr.info("Input harus huruf","Informasi");
		return;
	  }
	  
	  let data = {
		code : code.toUpperCase(),
		name : name,
		category : "product-jenis",
		'product-category' : []
	}
	 for(let i = 0; i < this.addkategori.length; i++){
		 data["product-category"].push(this.addkategori[i]);
	 }

	 
	for(let i = 0; i < this.datajenis.length; i++){
		if(this.datajenis[i].code==code.toUpperCase()){
			this.toastr.warning("Data code sama","Peringatan");
			return;
		}
	}
	 let ff = DataTypeUtil.Encode(data);
  	this.jenisservice.add(ff).subscribe(data=>{
  		if(data==false){
  			if(this.jenisservice.message()!=""){
  				return;
  			}
  		}
  		this.toastr.success("Data berhasil ditambah","Sukses");
  		this.listjenis = [];
  		this.loadData();
  		this.modaltambah = false;
  	})
  }

  Ubah(){
	if(!this.data_view){
		this.toastr.warning("Data belum dipilih","Peringatan");
		return;
	}else if(Object.keys(this.data_view).length==0){
		  this.toastr.warning("Data belum dipilih","Peringatan");
		  return;
	  }
	  let params = "?";
	  this.kategoriservice.list(params).subscribe(data=>{
		  if(data==false){
			  if(this.kategoriservice.message()!=""){
				  return;
			  }
		  }
		  this.data_kategori = data;
	  })
  	this.modalupdate = true;
  	this.uptodate = [];
  	this.uptodate.push(this.data_view);
  	for(let i = 0; i < this.uptodate.length; i++){
		  this.dataupdate = this.uptodate[i];
		  this.dataupdatekategori = this.uptodate[i]["product-category"];
  	}
  }

  Update(){
  	for(let i = 0; i < this.uptodate.length; i++){
  		console.log(this.uptodate[i]._id);
  		let data = {
  			_id 	: this.uptodate[i]._id,
			name 	: this.dataupdate["name"],
			"product-category" : []  
  		}

		  console.log(data);
		  if(this.dataupdatekategori.length <= 0){
			  this.toastr.warning("Produk kategori belum ditambah","Peringatan");
			  return;
		  }

		  for(let i = 0; i < this.dataupdatekategori.length; i++){
			  data["product-category"].push(this.dataupdatekategori[i]);
		  }
  		let upd = DataTypeUtil.Encode(data);
  		this.jenisservice.update(upd).subscribe(data=>{
  			if(data==false){
  				if(this.jenisservice.message()!=""){
  					return;
  				}
  			}
  			this.toastr.success("Data berhasil diubah","Sukses");
  			this.listjenis = [];
  			this.loadData();
  			this.modalupdate = false;
  		})
  	}
  }

  Hapus(){
  	this.delete = [];
  	this.delete.push(this.data_view);
  	for(let i = 0; i < this.delete.length; i++){
  		let data = {_id : this.delete[i]._id}
  		let dlt = DataTypeUtil.Encode(data);
  		this.jenisservice.delete(dlt).subscribe(data=>{
  			if(data==false){
  				if(this.jenisservice.message()!=""){
  					return;
  				}
  			}
  			this.toastr.success("Data berhasil dihapus","Sukses");
  			this.listjenis = [];
  			this.loadData();
  		})
  	}
  }

  Detail(){
	if(!this.data_view){
		this.toastr.warning("Data belum dipilih","Peringatan");
		return;
	}else if(Object.keys(this.data_view).length==0){
		this.toastr.warning("Data belum dipilih","Peringatan");
		return;
	}
	this.listviewjenis = [];
	this.modalview = true;
	this.listviewjenis.push(this.data_view);
	for(let i = 0; i < this.listviewjenis.length; i++){
		this.listviewkat = this.listviewjenis[i]["product-category"];
	}
  }

  async loadData(){
  	let params = "?";
  	this.jenisservice.list(params).subscribe(data=>{
  		if(data==false){
  			if(this.jenisservice.message()!=""){
  				return;
  			}
  		}
  		this.datajenis = data;
  	})
  }

}
