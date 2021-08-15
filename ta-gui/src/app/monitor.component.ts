import { Component, OnInit } from "@angular/core";
import { Monitor } from "../../../common/monitor";
import { MonitorService } from './monitor.service';

@Component({
    selector: 'app-root',
    templateUrl: '/monitor.component.html',
    styleUrls: ['./monitor.component.css']
})

export class MonitoresComponent implements OnInit{
   
    monitor: Monitor = new Monitor();
    monitores: Monitor[] = [];
    cpfDuplicado: boolean = false;
    

    constructor (private monitoresService: MonitorService) {}

    criarMonitor(a: Monitor): void{
        this.monitoresService.criar(a)
            .subscribe(
                ar => {
                    if (ar) {
                        this.monitores.push(ar);
                        this.monitor = new Monitor()          
                   } else {
                        this.cpfDuplicado = true;
                   }
                },
                msg => {alert(msg.message);}
            )
    }
    onMove(): void {
        this.cpfDuplicado =false;
    }

    ngOnInit(): void {
        this.monitoresService.getMonitores()
        .subscribe(
            as => { this.monitores = as;},
            msg => { alert(msg.message);}
        );
    }
}