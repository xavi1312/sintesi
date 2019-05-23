import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Serveis
import { AuthGuardService as isAuth } from 'src/app/serveis/auth/auth-guard.service';

// Components
import { HomeComponent } from './home/home.component';
import { EtiquetesComponent } from './etiquetes/etiquetes.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, canActivate: [isAuth],
    children: [
      {
        path: '',
        component: EtiquetesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
