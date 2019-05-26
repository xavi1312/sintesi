import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Serveis
import { AuthGuardService as isAuth } from 'src/app/serveis/auth/auth-guard.service';

// Components
import { HomeComponent } from './home/home.component';
import { EtiquetesComponent } from './etiquetes/etiquetes.component';
import { TasquesComponent } from './tasques/tasques.component';
import { TascaComponent } from 'src/app/Components/tasca/tasca.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, canActivate: [isAuth],
    children: [
      { path: '', component: TasquesComponent },
      { path: 'tasques/avui/:data', component: TasquesComponent, canActivate: [isAuth] },
      { path: 'tasques/setmana/:data', component: TasquesComponent, canActivate: [isAuth] },
      { path: 'etiquetes', component: EtiquetesComponent, canActivate: [isAuth] },
      { path: 'tasca/:id', component: TascaComponent, canActivate: [isAuth] },
      { path: 'tasca', component: TascaComponent, canActivate: [isAuth] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
