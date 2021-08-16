import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

import { Monitor } from '../../../common/monitor';

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

}