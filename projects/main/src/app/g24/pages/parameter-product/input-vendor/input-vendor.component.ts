import { Component, OnInit } from '@angular/core';
import { DContent } from '../../../decorators/content/pages';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { DataTypeUtil } from '../../../lib/helper/data-type-util';

//ALERT
import { ToastrService } from 'ngx-toastr';

//SERVICE
import { VendorService } from '../../../services/vendor.service';
import { ProductCategoryService } from '../../../services/product/product-category.service';

@Component({
  selector: 'app-input-vendor',
  templateUrl: './input-vendor.component.html',
  styleUrls: ['./input-vendor.component.scss']
})

@DContent(InputVendorComponent.key)
export class InputVendorComponent implements OnInit {
static key = EMenuID.VENDOR;

search : any = {};
input : any = {};
data_view : any = {};
dataupdate : any = {};
dataupdatekategori : any[] = [];
select_kategori : any = {};
select_kategori_add : any = {};
select_kategori_upd : any = {};
select_kategori_add_upd : any = {};

delete : any[] = [];
uptodate : any[] = [];
datakategori : any[] = [];
data_kategori : any[]= [];
addkategori : any[] = [];

idproduct : any[] = [];
idprmjual : any[] = [];

listviewvendor : any[] = [];
listviewkat : any[] = [];

modaltambah : boolean = false;
modalupdate : boolean = false;

modalview : boolean = false;

datavendor : any[] = [];
listvendor : any[] = [];

  constructor(private toastr : ToastrService, private vendorservice : VendorService,
              private kategoriservice : ProductCategoryService) { }

  ngOnInit(): void {
    let params = "?";
    this.vendorservice.list(params).subscribe(data=>{
      if(data==false){
        if(this.vendorservice.message()!=""){
          return;
        }
      }
      this.datavendor = data;
    })

    this.kategoriservice.list(params).subscribe(data=>{
      if(data==false){
        if(this.kategoriservice.message()!=""){
          return;
        }
      }
      this.data_kategori = data;
    })
  }

  SearchData(){
    let params = "?";
    if(!this.search["kategori"]){
    for(let key in this.search){
      if(this.search[key]==""||this.search[key]==null)continue;
        switch(key){
          case 'kategori':
            params += "product-category.code="+this.search[key].code+"&";
            break; 

          case 'code':
            params += "code="+this.search[key].code+"&";
            break;

          default:
            params += key+="="+this.search[key]+"&";
            break;
        }
    }
    this.vendorservice.list(params).subscribe(data=>{
      if(data==false){
        if(this.vendorservice.message()!=""){
          this.toastr.info("Data tidak ditemukan","Informasi");
          this.listvendor = [];
          return;
        }
      }
      this.listvendor = data;
    })
    return;
  }

  this.vendorservice.list(params+"product-category.name_regex=1&product-category.name="+this.search["kategori"]).subscribe(data=>{
    if(data==false){
      if(this.vendorservice.message()!=""){
        this.toastr.info("Data tidak ditemukan","Informasi");
        this.listvendor = [];
        return;
      }
    }
    this.listvendor = data;
  })
  }

  Tambah(){
    this.addkategori = [];
    let params = "?";
    this.modaltambah = true;
    this.kategoriservice.list(params).subscribe(data=>{
      if(data==false){
        if(this.kategoriservice.message()!=""){
          return;
        }
      }
      this.datakategori = data;
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
    this.select_kategori_upd = [];
    this.modalupdate = true;
    this.uptodate = [];
    this.uptodate.push(this.data_view);

  	for(let i = 0; i < this.uptodate.length; i++){
		  this.dataupdate = this.uptodate[i];
		  this.dataupdatekategori = this.uptodate[i]["product-category"];
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
  this.listviewvendor = [];
	this.modalview = true;
	this.listviewvendor.push(this.data_view);
	for(let i = 0; i < this.listviewvendor.length; i++){
		this.listviewkat = this.listviewvendor[i]["product-category"];
	}
  }

  TambahKategori(){
    if(!this.select_kategori){
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
    this.listvendor = [];
    let code = this.input["code"];
    let name = this.input["name"];

    let Objdata = {
      code : code,
      name : name,
      "product-category" : []
    }

    for(let i = 0; i < this.addkategori.length; i++){
      Objdata["product-category"].push(this.addkategori[i]);
    }

    if(this.addkategori.length <= 0){
      this.toastr.warning("Data kategori belum ditambah","Peringatan");
      return;
    }else if(!code||!name){
      this.toastr.warning("Kode atau name belum di isi","Peringatan");
      return;
    }

    let addData = DataTypeUtil.Encode(Objdata);
    this.vendorservice.add(addData).subscribe(data=>{
      if(data==false){
        if(this.vendorservice.message()!=""){
          return;
        }
      }
      this.toastr.success("Data berhasil disimpan","Sukses");
      this.modaltambah = false;
      this.loadData();
    })
  }

  Update(){
    for(let i = 0; i < this.uptodate.length; i++){

  		console.log(this.uptodate[i]._id);
  		let data = {
			_id 	: this.uptodate[i]._id,
			name 	: this.dataupdate["name"],
			code 	: this.dataupdate["code"],
			"product-category" : []  
  		}

		if(this.dataupdatekategori.length <= 0){
			this.toastr.warning("Produk kategori belum ditambah","Peringatan");
			return;
		}
		for(let r = 0; r < this.dataupdatekategori.length; r++){
		data["product-category"].push(this.dataupdatekategori[r]);
		}
		  let upd = DataTypeUtil.Encode(data);
  		this.vendorservice.update(upd).subscribe(data=>{
  			if(data==false){
  				if(this.vendorservice.message()!=""){
  					return;
  				}
  			}
  			this.toastr.success("Data berhasil diubah","Sukses");
  			this.listvendor = [];
  			this.loadData();
  			this.modalupdate = false;
		})
		
		  
  	}
  }

  async loadData(){
  	let params = "?";
  	this.vendorservice.list(params).subscribe(data=>{
      if(data==false){
        if(this.vendorservice.message()!=""){
          return;
        }
      }
      this.datavendor = data;
    })
  }

}
