import { NgModule, ModuleWithProviders } from '@angular/core';
import { AppModule } from './app.module';


@NgModule({})
export class PlatformModule{
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: []
    }
  }
}