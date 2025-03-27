import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { MenuItem } from '../../interface/MenuItem';
import { ConfiguracaoService } from 'src/app/service/configuracao.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  usuarioLogado: string = '';
  role: string = '';
  menuItems: MenuItem[] = [];  

  constructor(
    private router: Router,
    private authService: AuthService,
    private configuracaoService: ConfiguracaoService,
    private cdr: ChangeDetectorRef  
  ) { 
    this.usuarioLogado = authService?.getUsuarioAutenticado();
    this.role = authService?.getRole();    
  }

  ngOnInit(): void {
    // Carregar o menu ao inicializar
    this.configuracaoService.getMenu().subscribe(
      (data) => {        
        this.menuItems = data;  
      },
      (error) => {
        console.error('Erro ao carregar o menu:', error);
      }
    );
    
    // Recuperando o estado do menu do localStorage
    const savedState = localStorage.getItem('menuState');
    if (savedState) {
      this.menuItems = JSON.parse(savedState);  
    }
  }

  onLogout(): void {
    this.authService.encerrarSessao();
    this.router.navigate(['/login']);
  }

  toggleMenu(item: MenuItem): void {
    item.expanded = !item.expanded;
    
    // Salvar estado do menu no localStorage
    localStorage.setItem('menuState', JSON.stringify(this.menuItems));
    
    // Forçar detecção de mudanças para atualizar o view
    this.cdr.markForCheck();
  }
}
