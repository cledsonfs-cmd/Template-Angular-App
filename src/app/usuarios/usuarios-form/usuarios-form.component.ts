import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { AuthService } from 'src/app/auth.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.css']
})
export class UsuariosFormComponent implements OnInit{

  roles:string[] = ['ADMIN', 'SOLICITANTE', 'FISCAL'];
  usuario: User;
  id: number = 0;  
  erros: String[] = [];  
  mensagemSucesso = '';
  
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: AuthService
  ){
    this.usuario = new User();
  }

  closeMessage(): void {
    setTimeout(() => {
      this.mensagemSucesso = '';
      this.erros = [];
      if(!this.id || this.id === 0){
        this.back();
      }
    }, 3000);
  }

  ngOnInit(): void {
    let params = this.activatedRoute.params;
        
    if(params){
      params.subscribe(
        (params: Params) => {
          this.id = (+params["id"])
        }    
      );
    }

    if(this.id){
      this.service
      .getUsuario(this.id)
      .subscribe(
        response => {
          this.usuario = response
        }        
      )
    }else{
      this.usuario = new User();
      this.usuario.ativo = true;
    }
  }

  selecionarRole(role: string): void{
    this.usuario.role = role;
  }


  back(): void {
    this.router.navigate(['/usuarios']);
  }

  salvar(): void {  
    this.service.salvar(this.usuario).subscribe({
      next: (response: any) => {      
        this.mensagemSucesso = response?.mensagem;           
        this.erros = [];
      },
      error: (errorResponse: any) => {        
        this.erros = errorResponse.error?.erros;
        this.mensagemSucesso = '';        
      }
    });  
    this.closeMessage();      
  } 

}
