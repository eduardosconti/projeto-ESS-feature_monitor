import { Component, OnInit } from '@angular/core';
import { Monitor } from 'src/app/models/monitor';
import { AlunoService } from 'src/app/services/aluno.service';
import { MonitorService } from 'src/app/services/monitor.service';

@Component({
  selector: 'app-monitores',
  templateUrl: './monitores.component.html',
  styleUrls: ['./monitores.component.css'],
})
export class MonitoresComponent implements OnInit {
  monitor: Monitor = new Monitor();
  attmonitor: Monitor = new Monitor();
  monitores: Monitor[] = [];
  cpfDuplicado: boolean = false;
  atualizando: boolean[] = [];
  check: boolean = false;
  inserido: boolean = false;
  cpfinvalido: boolean = false;
  emailinvalido: boolean = false;
  semNome: boolean = false;
  tentouAtualizar: boolean = false;


  constructor(
    private monitoresService: MonitorService,
    private alunosService: AlunoService
  ) {}

  criarMonitor(a: Monitor): void {
    if (a.nome.length > 0) {
      if (this.cpfValido(a.cpf)){
        if(this.emailValido(a.email)) {
          this.monitoresService.criar(a).subscribe(
            (ar) => {
              if (ar) {
                this.monitores.push(ar);
                this.listaAlunos();
                this.monitor = new Monitor();
                this.atualizando.push(false);
            } else {
              this.cpfDuplicado = true;
            }
          },
          (msg) => {
            alert(msg.message);
          }
          );
        } else{
          this.emailinvalido = true;
        }
      } else{
        this.cpfinvalido = true;
      }
  } else {
    this.semNome = true;
  }
 

}

  removerMonitor(a: Monitor): void {
    this.check = this.atualizando.some(v => v === true);
    if (!this.check){
    this.monitoresService.deletar(a).subscribe((ad) => {
      if (ad) {
        var result: Monitor = this.monitores.find((k) => k.cpf == a.cpf);
        this.monitores.splice(this.monitores.indexOf(result), 1);
        this.listaAlunos();
      }
    });
  } else {
    this.tentouAtualizar = true;
  }
  }
  atualizar(a: Monitor, i: number): void {
    this.check = this.atualizando.some(v => v === true);
    if (!this.check){
    this.attmonitor = Object.assign({}, a);
    this.atualizando[i] = true;
  } else {
    this.tentouAtualizar = true;
  }
  }
  atualizarMonitor(a: Monitor, cpf: String, i: number): void {
    this.monitoresService.atualizar(a).subscribe((ad) => {
      if (ad) {
        var result: Monitor = this.monitores.find((k) => k.cpf == cpf);
        if (a.nome.length > 0) {
          if (this.emailValido(a.email)) {
            result.nome = a.nome;
            result.email = a.email;
            result.github = a.github;
            this.listaAlunos();
          } else {
            this.emailinvalido = true;
          }
        } else {
          this.semNome = true;
        }
      }
    });
    this.attmonitor = new Monitor();
    this.atualizando[i] = false;
  }

  onMove(): void {
    this.cpfDuplicado = false;
    this.emailinvalido = false;
    this.semNome = false;
    this.cpfinvalido = false;
    this.tentouAtualizar = false;
  }

  listaAlunos(): void {
    let arrAluno = this.alunosService.getAlunos();

    arrAluno.subscribe(
      (as) => {
        this.monitores.sort((a, b) =>
          a.nome > b.nome ? 1 : b.nome > a.nome ? -1 : 0
        );
        let aux = as.sort((a, b) =>
          a.nome > b.nome ? 1 : b.nome > a.nome ? -1 : 0
        );
        aux = aux.reverse();
        let tamanhoA = aux.length;
        let monRestantes = this.monitores.length;
        let aPerm = Math.ceil(tamanhoA / monRestantes);
        if (tamanhoA > 0) {
          for (let mon of this.monitores) {
            mon.alunos = [];
            tamanhoA = aux.length;
            console.log(aux);
            aPerm = Math.ceil(tamanhoA / monRestantes);
            for (let i = 0; i < aPerm; i++) {
              mon.alunos = mon.alunos.concat(aux.pop().nome);
              console.log(mon.alunos);
            }
            monRestantes -= 1;
          }
        }
      },
      (msg) => {
        alert(msg.message);
      }
    );
  }

  cpfValido(cpf: string): boolean {
    let a : number = +cpf;
        if (a.toString().length == 11) {
          return true;
        } else {
          return false;
        }
     }
  
  emailValido(email: string): boolean {
      if (email.includes("@cin.ufpe.br")) {
          return true;
      } else {
          return false;
        }
  }
  
  ngOnInit(): void {
    this.monitoresService.getMonitores().subscribe(
      (as) => {
        this.monitores = as;
      },
      (msg) => {
        alert(msg.message);
      }
    );
  }
  esconderAtualizacao() {
    var x = document.getElementById('divAtualizar');
    if (x.style.display == 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  }
}
