import { Component, OnInit, Input, ViewContainerRef, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { Pages } from '../../decorators/content/pages';
import { ContentPage, IContent } from '../../lib/helper/content-page';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})

export class ContentComponent implements OnInit, IContent {

  content : ViewContainerRef;

  public GetActivePage() : string
  {
    return ContentPage.ActiveContent;
  }

  protected defaultPage : string = 'home';
  public GetDefaultPage() : string
  {
    let page : string = this.defaultPage;

    return page;
  }

  constructor(private resolver : ComponentFactoryResolver, vcr : ViewContainerRef) 
  {
    this.content = vcr
  }

  ngOnInit(): void {
    this.LoadContent()
    ContentPage.Component = <IContent><unknown>this;
  }

  public ClearContent() : void
  {
    this.content.clear()
  }

  public LoadContent() : any
  {
    console.debug('LoadContent called...')
    Pages.call()
    const pageID = this.GetActivePage();
    const class2Create = Pages.get(pageID)
    if(class2Create == null)
    {
      console.info('Page Name not found. Name: ' + pageID);
      return;
    }
    const cls = Object.create(class2Create.prototype)
    console.debug(cls.constructor)
    const factory = this.resolver.resolveComponentFactory(cls.constructor)
    console.debug(factory)
     return this.content.createComponent(factory)
  }
}
