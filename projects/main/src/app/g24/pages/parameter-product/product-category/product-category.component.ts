import { Component, OnInit } from '@angular/core';
import { DContent } from '../../../decorators/content/pages';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { DataTypeUtil } from '../../../lib/helper/data-type-util';
import { Key } from 'protractor';
import { environment } from 'src/environments/environment';
import { Observable, config } from 'rxjs';
import { HttpClient } from '@angular/common/http';

//ALERT
import { ToastrService } from 'ngx-toastr';

//SERVICE
import { ProductCategoryService } from '../../../services/product/product-category.service';
import { AlphaNumeric } from '../../../lib/helper/alpha-numeric';
import { TransactionMethodService } from '../../../services/transaction/transaction-method.service';


@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})

@DContent(ProductCategoryComponent.key)
export class ProductCategoryComponent implements OnInit {
static key = EMenuID.PARAM_KATEGORI;


search : any = {};
input : any = {};
update : any = {};

datakategori : any[] = [];
data_view : any = {};
dataupdate : any = {};

delete : any[] = [];
uptodate : any[] = [];

listkategori : any[] = [];


modaltambah : boolean = false;
modalupdate : boolean = false;


//HITUNG DB KATEGORI
hitung : number = 0;
jumlah : number = 0;


  constructor(private kategoriservice : ProductCategoryService, private toastr : ToastrService) { }

  ngOnInit(): void {
  	let params = "?";
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
  	for(let key in this.search){
  		if(this.search[key]==""||this.search[key]==null)continue;
  		switch(key){
  			case "code":
  			params += "code="+this.search[key].code+"&";
  			break;

  			case "name":
  			params += "name="+this.search[key].name+"&";
  			break;

  			default:
  			 params += key+="="+this.search[key]+"&";
  			 break;
  		}
  	}
  	this.kategoriservice.list(params).subscribe(data=>{
  		if(data==false){
  			if(this.kategoriservice.message()!=""){
  				this.toastr.info("Data tidak ditemukan","Informasi");
  				return;
  			}
  		}
  		this.listkategori = data;
  	})
  }

  Tambah(){
  	this.modaltambah = true;
  	this.input = {};
  }

  Ubah(){
	if(Object.keys(this.data_view).length == 0){
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
  	for(let i = 0; i < this.uptodate.length; i++){
  		console.log(this.uptodate[i]._id);
  		let data = {
  			_id 	: this.uptodate[i]._id,
  			name 	: this.dataupdate["name"]
  		}

  		console.log(data);

  		let upd = DataTypeUtil.Encode(data);
  		this.kategoriservice.update(upd).subscribe(data=>{
  			if(data==false){
  				if(this.kategoriservice.message()!=""){
  					return;
  				}
  			}
  			this.toastr.success("Data berhasil diubah","Sukses");
  			this.listkategori = [];
  			this.loadData();
  			this.modalupdate = false;
  		})
  	}
  }

  Hapus(){
	if(Object.keys(this.data_view).length==0){
		this.toastr.warning("Data belum dipilih","Peringatan");
		return;
	}
  	this.delete = [];
  	this.delete.push(this.data_view);
  	for(let i = 0; i < this.delete.length; i++){
  		let data = {_id : this.delete[i]._id}
  		let dlt = DataTypeUtil.Encode(data);
  		this.kategoriservice.delete(dlt).subscribe(data=>{
  			if(data==false){
  				if(this.kategoriservice.message()!=""){
  					return;
  				}
  			}
  			this.toastr.success("Data berhasil dihapus","Sukses");
  			this.listkategori = [];
  			this.loadData();
  		})
  	}
  }


  Simpan(){
  	let name = this.input['name'];
	

			let num = AlphaNumeric.Encode(this.datakategori.length);
			if(num.length <= 1){
				num = "0"+num;
			}

			let v = {
				name : name,
				code : "c"+num,
				category : "product-category"
			}
			console.log(v);
			let dt = DataTypeUtil.Encode(v);

			if(!name){
				this.toastr.warning("Nama produk kategori belum diisi","Peringatan");
				return;
			}
			//ADD DB 
			this.kategoriservice.add(dt).subscribe(data=>{
					if(data==false){
						if(this.kategoriservice.message()!=""){
							return;
						}
					}
					this.toastr.success("Data berhasil ditambah","Sukses");
					this.listkategori = [];
					this.loadData();
					this.modaltambah = false;
			    })
	
  }

  async loadData(){
  	let params = "?";
  	this.kategoriservice.list(params).subscribe(data=>{
  		if(data==false){
  			if(this.kategoriservice.message()!=""){
  				return;
  			}
  		}
  		this.datakategori = data;
  	})
  }

}
