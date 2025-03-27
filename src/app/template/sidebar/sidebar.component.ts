import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { MenuItem } from '../../interface/MenuItem';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  usuarioLogado: string = '';
  role:string = '';
  menuItens: MenuItem[] =[
    {label: 'Sistemas', icon:'', route:'', expanded: false,children: [ {label: 'Dashboard', icon:'fas fa-tachometer-alt', route:'"/home',expanded: false}]},
    {label: 'Serviços', icon:'', route:'', expanded: false,children: [ 
                                                        {label: 'Servico 1', icon:'fas fa-columns', route:'/servicos/servico1',expanded: false},
                                                        {label: 'Servico 2', icon:'fas fa-columns', route:'/servicos/servico2',expanded: false},
                                                        {label: 'Servico 3', icon:'fas fa-columns',expanded: false, children:[
                                                          {label: 'Especificação 1', icon:'fas fa-tachometer-alt', route:'"/especificacoes/especificacao1',expanded: false},
                                                          {label: 'Especificação 2', icon:'fas fa-tachometer-alt', route:'"/especificacoes/especificacao2',expanded: false}
                                                        ]}
                                                      ]},
    {label: 'Relatórios', icon:'', route:'',expanded: false, children: [ 
                                                        {label: 'Relatorio 1', icon:'fas fa-list', route:'/relatorios/relatorio1',expanded: false},
                                                        {label: 'Relatorio 2', icon:'fas fa-list', route:'/relatorios/relatorio2',expanded: false},
                                                        {label: 'Relatorio 3', icon:'fas fa-list', route:'/relatorios/relatorio3',expanded: false}
                                                      ]},
    {label: 'Configurações', icon:'', route:'',expanded: false, children: [ {label: 'Usuários', icon:'fas fa-users', route:'/usuarios',expanded: false}]}
  ]
  cdr: any;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { 
    this.usuarioLogado = authService?.getUsuarioAutenticado();
    this.role = authService?.getRole();
  }

  ngOnInit(): void {
    const savedState = localStorage.getItem('menuState');
    if (savedState) {
      this.menuItens = JSON.parse(savedState);
    }
  }
  

  onLogout():void {
    this.authService.encerrarSessao();
    this.router.navigate(['/login']);
  }

  toggleMenu(item: MenuItem): void {
    item.expanded = !item.expanded;
    
    // 🔹 Salvar estado no Local Storage
    localStorage.setItem('menuState', JSON.stringify(this.menuItens));
  
    this.cdr.markForCheck();
  }
  
  
}
