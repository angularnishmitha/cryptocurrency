import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { CryptoconverterComponent } from './cryptoconverter/cryptoconverter.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'CryptoConverter', component: CryptoconverterComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
