import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlunosComponent } from './alunos.component';
import { MonitoresComponent } from './monitor.component';
import { AlunoService } from './aluno.service';
import { MonitorService } from './monitor.service';

@NgModule({
  declarations: [
    AppComponent,
    AlunosComponent,
    MonitoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule, 
    RouterModule.forRoot([
      {
        path: 'alunos',
        component: AlunosComponent
      },
      {
        path: 'monitores',
        component: MonitoresComponent
      }
    ])
  ],
  providers: [AlunoService, MonitorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
