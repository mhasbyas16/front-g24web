import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, ViewContainerRef } from '@angular/core';
import { ContentPage } from '../../lib/helper/content-page';
import { ModuleLoader } from '../../lib/helper/module-loader';
import { Router } from '@angular/router';
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
//list side bar
import { management, kasir, stock, kadetRetail, staffRetail, keuangan, staffStock, staffPurchasing, kadepStock, managerDistro } from '../../sample/output-sidebar';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {

  @ViewChild('json') input;

  allPages = [];

  menus = new Map<string,any>();

  noParent = [];
  
  output =[];

  //LIST
  listKeuangan = keuangan;
  listManagement = management;
  listKasir = kasir;
  stock = stock;
  KDR = kadetRetail; 
  SR = staffRetail;
  MD = managerDistro;
  SS = staffStock;
  SP = staffPurchasing;
  KS = kadepStock;
  IT = management;

  constructor(private cdRef : ChangeDetectorRef, private router : Router,private sessionService: SessionService)
  {
    window['SidebarComponent'] = this;
    window['sidebarReload'] = this.ReloadSidebar;
    window['ModuleLoader'] = ModuleLoader;
    window['cfg'] = this.routerCfg()
  }

  routerCfg()
  {
    return this.router.config
  }

  ngOnInit(): void {
    this.output.splice(0);
    const getRole = this.sessionService.getRole();

    switch (getRole["name"]) {
      case "Management":
          this.output = this.output.concat(this.listManagement);
          break;
      case "Keuangan":
        this.output = this.output.concat(this.listKeuangan);
        break;
      case "kasir":
        this.output = this.output.concat(this.listKasir);
          break;
      case "stock":
        this.output = this.output.concat(this.stock);
        break;
      case "kadetRetail":
        this.output = this.output.concat(this.KDR);
        break;
      case "staffRetail":
        this.output = this.output.concat(this.SR);
        break;
      case "managerDistro":
          this.output = this.output.concat(this.MD);
          break;
      case "staffStock":
        this.output = this.output.concat(this.SS);
        break;
      case "staffPurchasing":
        this.output = this.output.concat(this.SP);
        break;
      case "kadepStock":
        this.output = this.output.concat(this.KS);
        break;

      case "ITs":
        this.output = this.output.concat(this.listManagement);
        break;

      default:
          this.output = this.output;
          console.debug("Role Tidak ditemukan gagal load list sidebar");
          break;
    }
    // this.output = 
    // [
    //   {_id: "0001", type: "menu", name : "Inventory Addition", icons: "yang bagus", color : "warna-warni", componentId : "x1001", parentId: "", module: "x1"},
    //   // {_id: "0001", type: "menu", name : "Inventory Management", icons: "yang bagus", color : "warna-warni", componentId : "x1002", parentId: "", module: "x1"},
    //   {_id: "0002",type: "sub-menu", name : "Inisiasi", icons: "yang bagus", color : "warna-warni", componentId : "1001", parentId: "x1001", module: "x1", menu : {_id: "0001"}},
    //   // {_id: "0002",type: "sub-menu", name : "SKU", icons: "yang bagus", color : "warna-warni", componentId : "1003", parentId: "x1002", module: "x1", menu : {_id: "0001"}},
    //   {_id: "0003", type: "menu", name : "Penjualan", icons: "shopping-cart", color : "warna-warni", componentId : "S10001", parentId: "", module: "pj"},
    //   {_id: "0003", type: "sub-menu", name : "Penjualan Distro", icons: "yang bagus", color : "warna-warni", componentId : "10001", parentId: "S10001", module: "pj",menu : {_id: "0003"}},
    //   // LAPORAN
    //   {_id: "0004", type: "menu", name : "Laporan", icons: "list", color : "warna-warni", componentId : "S10002", parentId: "", module: "lp"},
    //   {_id: "0004", type: "sub-menu", name : "Laporan Penjualan", icons: "yang bagus", color : "warna-warni", componentId : "10003", parentId: "S10002", module: "lp",menu : {_id: "0004"}},
    //   // SECURITY
    //   {_id: "0005", type: "menu", name : "Security", icons: "yang bagus", color : "warna-warni", componentId : "S10003", parentId: "", module: "rl"},
    //   {_id: "0005", type: "sub-menu", name : "Role", icons: "yang bagus", color : "warna-warni", componentId : "10002", parentId: "S10003", module: "rl",menu : {_id: "0005"}}
      
     
    // ];
    this.ReloadSidebar();
  }

  ReloadSidebar()
  {
    // output = 
    // [
    //   {_id: "0001", type: "menu", name : "Mencari jodoh", icons: "yang bagus", color : "warna-warni", componentId : "x1001", parentId: ""},
    //   {_id: "0001", type: "menu", name : "kepala", icons: "yang bagus", color : "warna-warni", componentId : "x1002", parentId: ""},
    //   {_id: "0002",type: "sub-menu", name : "turun ke hati", icons: "yang bagus", color : "warna-warni", componentId : "1001", parentId: "x1001", menu : {_id: "0001"}},
    //   {_id: "0002",type: "sub-menu", name : "terus makan hati", icons: "yang bagus", color : "warna-warni", componentId : "1003", parentId: "x1002", menu : {_id: "0001"}}
    // ];

    // let output = SidebarComponent.output;

    // order from type = "menu" then "sub-menu"
    if (this.output != null) 
    {
      this.allPages = this.output;
      for (let row of this.allPages) 
      {
        ModuleLoader.LoadModule(row.module);
        
        if (row.type == "menu")
        {
          row.collapse = true;
          this.menus.set(row.componentId, row);
          row.children = [];
        }

        if(row.type == "sub-menu")
        {
          let parent = this.menus.get(row.parentId)
          if(parent == null)
          {
            this.noParent.push(row)
          
          } else
          {
            parent.children.push(row);
          }
        }
      }
    }

    // this.cdRef.detectChanges();
  }

  ChangeContentArea(pageId : string)
  {
    if(pageId.startsWith("x")) return;
    ContentPage.ChangeContent(pageId, true)
  }

  addOutput()
  {
    let ele = this.input.nativeElement.value;
    let inp = JSON.parse(ele);
    // console.log(inp)
    this.output.push(inp)
    console.log("added: " + inp)
    this.ReloadSidebar();
    console.log("reloaded")
  }
}
