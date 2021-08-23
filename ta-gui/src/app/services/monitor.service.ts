import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';
import { Monitor } from '../models/monitor';
import { __param } from 'tslib';


@Injectable()
export class MonitorService {

  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private taURL = 'http://localhost:3000/monitores';

  constructor(private http: HttpClient) {}

  criar(monitor: Monitor): Observable<Monitor> {
    return this.http.post<any>(this.taURL, monitor, {headers: this.headers})
             .pipe( 
                retry(2),
                map( res => {if (res.success) {return monitor;} else {return null;}} )
              ); 
  }

  deletar(monitor: Monitor): Observable<Monitor> {
    return this.http.put<any>(this.taURL + "deletar",JSON.stringify(monitor),{headers: this.headers})          
              .pipe( 
                retry(2),
                map( res => {if (res.success) {return monitor;} else {return null;}} )
              ); 
  }

  atualizar(monitor: Monitor): Observable<Monitor> {
    return this.http.put<any>(this.taURL, JSON.stringify(monitor), {headers: this.headers})          
              .pipe( 
                retry(2),
                map( res => {if (res.success) {return monitor;} else {return null;}} )
              ); 
  }

  getMonitores(): Observable<Monitor[]> {
    return this.http.get<Monitor[]>(this.taURL)
              .pipe(
                 retry(2)
               );
  }

  private tratarErro(erro: any): Promise<any>{
    console.error('Acesso mal sucedido ao serviço de monitores',erro);
    return Promise.reject(erro.message || erro);
  }
}