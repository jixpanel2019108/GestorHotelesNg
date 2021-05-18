import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { AgregarHotelComponent } from './components/agregar-hotel/agregar-hotel.component';
import { AgregarEventoComponent } from './components/agregar-evento/agregar-evento.component';
import { AgregarHabitacionComponent } from './components/agregar-habitacion/agregar-habitacion.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'principal', component: PrincipalComponent},
  {path: 'agregar-hotel', component: AgregarHotelComponent},
  {path: 'agregar-evento', component: AgregarEventoComponent},
  {path: 'agregar-habitacion', component: AgregarHabitacionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
