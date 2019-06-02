import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistreComponent } from './pagines/registre/registre.component';
import { IniciSessioComponent } from './pagines/inici-sessio/inici-sessio.component';
import { PoliticaComponent } from './pagines/politica/politica.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: './pagines/home/home.module#HomeModule'
  },
  {
    path: 'registre',
    component: RegistreComponent
  },
  {
    path: 'inici-sessio',
    component: IniciSessioComponent
  },
  {
    path: 'politica-privacitat',
    component: PoliticaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
