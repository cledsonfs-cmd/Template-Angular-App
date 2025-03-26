import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { MenuItem } from '../interface/MenuItem';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  usuarioLogado: string = '';
  role:string = '';
  menuItem: MenuItem[] =[
    {label: 'Sistemas', icon:'', route:'', children: [ {label: '', icon:'fas fa-tachometer-alt', route:'"/home'}]},
    {label: 'Serviços', icon:'', route:'', children: [ 
                                                        {label: 'Servico 1', icon:'fas fa-columns', route:'/servicos/servico1'},
                                                        {label: 'Servico 2', icon:'fas fa-columns', route:'/servicos/servico2'},
                                                        {label: 'Servico 3', icon:'fas fa-columns', route:'/servicos/servico3'}
                                                      ]},
    {label: 'Relatórios', icon:'', route:'', children: [ 
                                                        {label: 'Relatorio 1', icon:'fas fa-list', route:'/relatorios/relatorio1'},
                                                        {label: 'Relatorio 2', icon:'fas fa-list', route:'/relatorios/relatorio2'},
                                                        {label: 'Relatorio 3', icon:'fas fa-list', route:'/relatorios/relatorio3'}
                                                      ]},
    {label: 'Configurações', icon:'', route:'', children: [ {label: 'Usuários', icon:'fas fa-users', route:'/usuarios'}]}
  ]

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
