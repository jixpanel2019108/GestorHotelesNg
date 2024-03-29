import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReservacionComponent } from './components/reservacion/reservacion.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PrincipalComponent } from './components/principal/principal.component';
import { AgregarHotelComponent } from './components/agregar-hotel/agregar-hotel.component';
import { AgregarEventoComponent } from './components/agregar-evento/agregar-evento.component';
import { AgregarHabitacionComponent } from './components/agregar-habitacion/agregar-habitacion.component';
import { AgregarServicioComponent } from './components/agregar-servicio/agregar-servicio.component';
import { HotelesPaisComponent } from './components/hoteles-pais/hoteles-pais.component';
import { HabitacionesHotelComponent } from './components/habitaciones-hotel/habitaciones-hotel.component';
import { DetalleHabitacionComponent } from './components/detalle-habitacion/detalle-habitacion.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { FooterComponent } from './components/footer/footer.component';
import { CargaComponent } from './components/carga/carga.component';
import { HotelesComponent } from './components/hoteles/hoteles.component';
import { HistorialComponent } from './components/historial/historial.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    NavbarComponent,
    ReservacionComponent,
    PrincipalComponent,
    AgregarHotelComponent,
    AgregarEventoComponent,
    AgregarHabitacionComponent,
    AgregarServicioComponent,
    HotelesPaisComponent,
    HabitacionesHotelComponent,
    DetalleHabitacionComponent,
    UsuariosComponent,
    FooterComponent,
    CargaComponent,
    HotelesComponent,
    HistorialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
