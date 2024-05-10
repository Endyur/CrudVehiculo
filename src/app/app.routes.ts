import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { AutosComponent } from './pages/autos/autos.component';

export const routes: Routes = [
    { path: '', component:InicioComponent}, 
    { path: 'inicio',component:InicioComponent},
    {path: 'auto/:id', component:AutosComponent}
];
