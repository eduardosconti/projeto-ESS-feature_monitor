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
                        this.monitores.push(ar);
                        this.listaAlunos();
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

    listaAlunos(): void {
        let arrAluno = this.alunosService.getAlunos();
        
        arrAluno.subscribe(
            (as) => {
                let aux = as.reverse();
                let tamanhoA = aux.length;
                let monRestantes = this.monitores.length;
                let aPerm = Math.ceil(tamanhoA/monRestantes);
                if (tamanhoA > 0){
                    for (let mon of this.monitores) {
                        tamanhoA = aux.length;
                        console.log(aux)
                        aPerm = Math.ceil(tamanhoA/monRestantes);
                        for (let i = 0; i < aPerm; i++) {
                            mon.alunos = mon.alunos.concat(aux.pop().nome); 
                            console.log(mon.alunos)
                        }
                        monRestantes -=1;
                    }
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