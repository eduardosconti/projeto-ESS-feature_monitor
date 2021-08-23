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

  constructor(
    private monitoresService: MonitorService,
    private alunosService: AlunoService
  ) {}

  criarMonitor(a: Monitor): void {
    console.log(this.cpfDuplicado)
    this.monitoresService.criar(a).subscribe(
      (ar) => {
        if (ar) {
          this.monitores.push(ar);
          this.listaAlunos();
          this.monitor = new Monitor();
          this.atualizando.push(false);
          this.inserido = true;
        } else {
          this.cpfDuplicado = true;
          alert("Já existe um aluno com esse cpf.");
        }
      },
      (msg) => {
        alert(msg.message);
      }
    );
    this.cpfDuplicado = false;
    this.inserido = false;
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
    alert("Por favor, finalize as atualizações pendentes antes de remover aluno.")
  }
  }
  atualizar(a: Monitor, i: number): void {
    this.check = this.atualizando.some(v => v === true);
    if (!this.check){
    this.attmonitor = Object.assign({}, a);
    this.atualizando[i] = true;
  } else {
    alert("Favor salvar atualização.")
  }
  }
  atualizarMonitor(a: Monitor, cpf: String, i: number): void {
    this.monitoresService.atualizar(a).subscribe((ad) => {
      if (ad) {
        var result: Monitor = this.monitores.find((k) => k.cpf == cpf);
        result.nome = a.nome;
        result.email = a.email;
        result.github = a.github;
        this.listaAlunos();
      }
    });
    this.attmonitor = new Monitor();
    this.atualizando[i] = false;
  }

  onMove(): void {
    this.cpfDuplicado = false;
    console.log(this.cpfDuplicado);
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
  esconderCadastro() {
    var x = document.getElementById('divCadastro');
    if (x.style.display == 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
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
