import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ExamplePageComponent } from './example-page/example-page.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { Example2PageComponent } from './example2-page/example2-page.component';
import { SpinnerComponent } from 'projects/platform/src/app/supportings/spinner/spinner.component';


@NgModule({
  declarations: [
    ExamplePageComponent, 
    Example2PageComponent,

    //supporting
    SpinnerComponent
  ],
  imports: [
    // routing: important
    AppRoutingModule,

    // UI/UX
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClarityModule,


  ],  
  exports: [
    RouterModule
  ],
  providers: [DatePipe],
})
export class AppModule { }
