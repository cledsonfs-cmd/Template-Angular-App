import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  usuarioLogado: string = '';
  role:string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) { 
    this.usuarioLogado = authService?.getUsuarioAutenticado();
    this.role = authService?.getRole();
  }

  onLogout():void {
    this.authService.encerrarSessao();
    this.router.navigate(['/login']);
  }
}
