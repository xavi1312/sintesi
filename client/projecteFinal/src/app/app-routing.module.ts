import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BenvingudaComponent } from './components/benvinguda/benvinguda.component';
import { RegistreComponent } from './components/registre/registre.component';
import { IniciSessioComponent } from './components/inici-sessio/inici-sessio.component';
import { HomeComponent } from './components/home/home.component';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthGuardService as isAuth} from '../app/serveis/auth/auth-guard.service';
import { SidenavComponent } from './components/header/sidenav/sidenav.component';

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
    path: 'sidenav',
    component: SidenavComponent,
    canActivate: [isAuth]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
