import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [UsuarioService]
})
export class NavbarComponent implements OnInit {
  public identidad

  constructor(public _usuarioService: UsuarioService) { 
    this.identidad = this._usuarioService.getIdentidad();
  }

  ngOnInit(): void {
    console.log(this.identidad);
    
  }

}