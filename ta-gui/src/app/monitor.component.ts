import { Component, OnInit } from "@angular/core";
import { Monitor } from "../../../common/monitor";
import { Aluno } from "../../../common/aluno";
import { MonitorService } from './monitor.service';
import { AlunoService } from "./aluno.service";

@Component({
    selector: 'app-root',
    templateUrl: '/monitor.component.html',
    styleUrls: ['./monitor.component.css']
})

export class MonitoresComponent implements OnInit{
   
    monitor: Monitor = new Monitor();
    monitores: Monitor[] = [];
    cpfDuplicado: boolean = false;
    

    constructor (private monitoresService: MonitorService, private alunosService: AlunoService) {}

    criarMonitor(a: Monitor): void{
        this.monitoresService.criar(a)
            .subscribe(
                ar => {
                    if (ar) {
                        ar.alunos = [];
                        this.listaAlunos(ar);
                        this.monitores.push(ar);
                        this.monitor = new Monitor(); 
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

    listaAlunos(a:Monitor): void {
        this.alunosService.getAlunos().subscribe(
            (as) => {for (let al of as){
                a.alunos = a.alunos.concat(al.nome);
            }
        },(msg) => {alert(msg.message);}
        )
    }

    ngOnInit(): void {
        this.monitoresService.getMonitores()
        .subscribe(
            as => { this.monitores = as; },
            msg => { alert(msg.message); }
        );
    }
}