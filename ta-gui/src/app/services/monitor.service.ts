import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';
import { Monitor } from '../models/monitor';


@Injectable()
export class MonitorService {

  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private taURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  criar(monitor: Monitor): Observable<Monitor> {
    return this.http.post<any>(this.taURL + "/monitores", monitor, {headers: this.headers})
             .pipe( 
                retry(2),
                map( res => {if (res.success) {return monitor;} else {return null;}} )
              ); 
  }

  /*deletar(monitor: Monitor): Promise<Monitor> {
    return this.http.put<any> (this.taURL + "/monitores",JSON.stringify(monitor), {headers: this.headers})
         .toPromise()
         .then(res => {
            if (res.json().success) {return monitor;} else {return null;}
         })
         .catch(this.tratarErro);
  }*/

  atualizar(monitor: Monitor): Observable<Monitor> {
    return this.http.put<any>(this.taURL + "/monitores",JSON.stringify(monitor), {headers: this.headers})          
              .pipe( 
                retry(2),
                map( res => {if (res.success) {return monitor;} else {return null;}} )
              ); 
  }

  getMonitores(): Observable<Monitor[]> {
    return this.http.get<Monitor[]>(this.taURL + "/monitores")
              .pipe(
                 retry(2)
               );
  }

  private tratarErro(erro: any): Promise<any>{
    console.error('Acesso mal sucedido ao serviço de monitores',erro);
    return Promise.reject(erro.message || erro);
  }
}