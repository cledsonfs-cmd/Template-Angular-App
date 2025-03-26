import { Component } from '@angular/core';
import { User } from '../model/User';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  erros: String[] = [];
  cadastrando: boolean = false;
  mensagemSucesso = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  onSubmit():void {
    this.authService.tentarLogar(this.username, this.password).subscribe({
      next: (response: any) =>{        
        sessionStorage.setItem('id', response?.id);
        sessionStorage.setItem('login', response?.login);
        sessionStorage.setItem('role', response?.role);
        sessionStorage.setItem('token', response?.token);
        this.mensagemSucesso = 'Usuario logado com sucesso.';
        this.cadastrando = false;   
        this.username = '';
        this.password = '';
        this.erros = [];
        this.router.navigate(['/home']);
      },
      error: (errorResponse: any) => {        
        this.erros = errorResponse.error?.erros;
        this.mensagemSucesso = '';        
      }
  }) 
  }

  preparaCadastrar(event: { preventDefault: () => void; }){
    event.preventDefault();
    this.cadastrando = true;
  }

  cancelaCadastro(){
    this.cadastrando = false;
  }

  cadastrar(): void {
    const usuario: User = {
      login: this.username,
      password: this.password,
      role: 'ADMIN'
    };
  
    this.authService.salvar(usuario).subscribe({
      next: (response: any) => {      
        this.mensagemSucesso = response?.mensagem;   
        this.cadastrando = false;   
        this.username = '';
        this.password = '';
        this.erros = [];
      },
      error: (errorResponse: any) => {        
        this.erros = errorResponse.error?.erros;
        this.mensagemSucesso = '';        
      }
    });    
  } 

}
