import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BenvingudaComponent } from './components/benvinguda/benvinguda.component';
import { RegistreComponent } from './components/registre/registre.component';
import { IniciSessioComponent } from './components/inici-sessio/inici-sessio.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuardService as isAuth} from '../app/serveis/auth/auth-guard.service';
import { EtiquetesComponent } from './components/etiquetes/etiquetes.component';

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
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [isAuth]
  },
  {
    path: 'home/etiquetes',
    component: EtiquetesComponent,
    canActivate: [isAuth]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
