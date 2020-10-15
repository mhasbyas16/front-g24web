import { NgModule, ModuleWithProviders } from '@angular/core';
import { AppModule } from './app.module';

@NgModule({})
export class MainModule{
  static forRoot(): ModuleWithProviders<AppModule> {
    return {
      ngModule: AppModule,
      providers: []
    }
  }
}