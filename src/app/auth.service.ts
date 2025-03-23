import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from './model/user';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL: string = environment.apiURLBase + '/auth';
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private http: HttpClient
  ) { }

  obterToken(){
    sessionStorage.getItem('token');
  }

  encerrarSessao(){
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('login');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('token');
  }

  getUsuarioAutenticado(): string{
    const login = sessionStorage.getItem('login');

    if(login){      
      return login;
    }
     return '';
  }

  getRole(): string{
    const role = sessionStorage.getItem('role');
    
    if(role){      
      return role;
    }
     return '';
  }  

  isAutenticated(): boolean{
    const token = sessionStorage.getItem('token');
    if(token){
      const expireted= this.jwtHelper.isTokenExpired(token);
      return !expireted;      
    }
    return false;
  }

  salvar(usuario: User): Observable<any>{    
    if(usuario.id ===0 || usuario.id === undefined){
      return this.http.post<any>(`${this.apiURL}/register`, usuario);
    }else{
      return this.http.post<any>(`${this.apiURL}/update`, usuario);
    }
  }

  tentarLogar(username: string, password: string): Observable<any> {    
    const body = {
      login: username,
      password: password
    };
  
    const headers = {      
      'Content-Type': 'application/json' 
    };  
    
    return this.http.post<any>(`${this.apiURL}/login`, body, { headers });
  }

  getUsuarios(): Observable<User[]>{    
    return this.http.get<User[]>(this.apiURL);
  }

  getUsuario(id: number): Observable<User>{    
    return this.http.get<User>(`${this.apiURL}/${id}`);
  }
  

}
