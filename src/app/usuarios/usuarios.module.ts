import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosFormComponent } from './usuarios-form/usuarios-form.component';
import { UsuariosListaComponent } from './usuarios-lista/usuarios-lista.component';


@NgModule({
  declarations: [
    UsuariosFormComponent,
    UsuariosListaComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    FormsModule
  ],
  exports: [
    UsuariosFormComponent,
    UsuariosListaComponent
  ]
})
export class UsuariosModule { }
