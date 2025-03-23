import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  dataHoraAtual: string = '';

  ngOnInit() {
    this.atualizarDataHora();
    setInterval(() => this.atualizarDataHora(), 1000); // Atualiza a cada segundo
  }

  atualizarDataHora() {
    this.dataHoraAtual = new Date().toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo' // Ajuste conforme necessário
    });
  }

}
