import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-usuarios-lista',
  templateUrl: './usuarios-lista.component.html',
  styleUrls: ['./usuarios-lista.component.css']
})
export class  UsuariosListaComponent implements OnInit{

  usuarios: User[] = [];

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  ngOnInit(): void {    
    this.authService.getUsuarios()
    .subscribe(resposta => this.usuarios = resposta);    
  }

  novoUsuario(){
    this.router.navigate(['/usuarios/novo'])
  }

}
