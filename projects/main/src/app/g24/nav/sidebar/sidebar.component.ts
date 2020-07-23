import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, ViewContainerRef } from '@angular/core';
import { ContentPage } from '../../lib/helper/content-page';
import { ModuleLoader } from '../../lib/helper/module-loader';
import { Router } from '@angular/router';

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
  
  output : any;

  constructor(private cdRef : ChangeDetectorRef, private router : Router)
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
    this.output = 
    [
      {_id: "0001", type: "menu", name : "Inventory Addition", icons: "yang bagus", color : "warna-warni", componentId : "x1001", parentId: "", module: "x1"},
      // {_id: "0001", type: "menu", name : "Inventory Management", icons: "yang bagus", color : "warna-warni", componentId : "x1002", parentId: "", module: "x1"},
      {_id: "0002",type: "sub-menu", name : "Inisiasi", icons: "yang bagus", color : "warna-warni", componentId : "1001", parentId: "x1001", module: "x1", menu : {_id: "0001"}},
      // {_id: "0002",type: "sub-menu", name : "SKU", icons: "yang bagus", color : "warna-warni", componentId : "1003", parentId: "x1002", module: "x1", menu : {_id: "0001"}},
      {_id: "0003", type: "menu", name : "Penjualan", icons: "shopping-cart", color : "warna-warni", componentId : "S10001", parentId: "", module: "pj"},
      {_id: "0003", type: "sub-menu", name : "Penjualan Distro", icons: "yang bagus", color : "warna-warni", componentId : "10001", parentId: "S10001", module: "pj",menu : {_id: "0003"}},
      // SECURITY
      {_id: "0004", type: "menu", name : "Security", icons: "yang bagus", color : "warna-warni", componentId : "S10002", parentId: "", module: "rl"},
      {_id: "0004", type: "sub-menu", name : "Role", icons: "yang bagus", color : "warna-warni", componentId : "10002", parentId: "S10002", module: "rl",menu : {_id: "0004"}}
      
     
    ];
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
