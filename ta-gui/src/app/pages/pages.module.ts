import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlunosComponent } from './alunos/alunos.component';
import { MonitoresComponent } from './monitores/monitores.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AlunosComponent,
    MonitoresComponent
  ],
  exports: [
    AlunosComponent,
    MonitoresComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class PagesModule { }
