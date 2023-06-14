import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [{ path: 'converter', 
loadChildren: () => import('./converter/converter.module').then(m => m.ConverterModule) }];

@NgModule({
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule.forRoot(routes),
   
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
