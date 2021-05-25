//PADRE
import { Component, OnInit  } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../model/usuario.model';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[UsuarioService]
})
export class LoginComponent implements OnInit {
  public usuarioModel: Usuario
  public token
  public identidad

  constructor(private _usuarioService: UsuarioService, private _router:Router) {
    this.usuarioModel = new Usuario ("","","","","","","","","","","","","","")
   }

  ngOnInit(): void {
  }
//TODO: arreglar bien la funcion de login
  getToken(){
    this._usuarioService.login(this.usuarioModel,'true').subscribe(
      response => {
        this.token = response.token;
        localStorage.setItem('token',this.token)

      },
      error=> {
        console.log(<any>error);
        
      }
    )
  }

  login(){
    this._usuarioService.login(this.usuarioModel).subscribe(
      response => {
        this.identidad = response.usuarioEncontrado;
        localStorage.setItem('identidad', JSON.stringify(this.identidad))
        this.getToken()
        
        
        if (this.identidad.rol == 'ROL_USUARIO'){
          this._router.navigate(['/principal'])

        }else if (this.identidad.rol == 'ROL_ADMIN'){
          this._router.navigate(['/registro'])
        }
      },
      error => {
        Swal.fire(
          'Usuario o contrasenia incorrecta!',
          'ingrese correctamente!',
          'error'
        )
      }
    )
    
  }

  refresh(): void{
    window.location.reload();
  }

}
