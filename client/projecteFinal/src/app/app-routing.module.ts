import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BenvingudaComponent } from './components/benvinguda/benvinguda.component';
import { RegistreComponent } from './components/registre/registre.component';
import { IniciSessioComponent } from './components/inici-sessio/inici-sessio.component';

const routes: Routes = [
  {
    path: '',
    component: BenvingudaComponent
  },
  {
    path: 'registre',
    component: RegistreComponent
  },
  {
    path: 'inici-sessio',
    component: IniciSessioComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
