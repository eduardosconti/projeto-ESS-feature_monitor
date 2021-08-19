import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { PagesModule } from './pages/pages.module';
import { AlunoService } from './services/aluno.service';
import { MonitorService } from './services/monitor.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule, 
    ComponentsModule,
    PagesModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AlunoService, MonitorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
