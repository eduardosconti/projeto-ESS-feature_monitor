import { Component, OnInit } from '@angular/core';
import { Aluno } from 'src/app/models/aluno';
import { AlunoService } from 'src/app/services/aluno.service';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css'],
})
export class AlunosComponent implements OnInit {
  aluno: Aluno = new Aluno();
  alunos: Aluno[] = [];
  cpfduplicado: boolean = false;
  githubDup: boolean = false;

  constructor(private alunoService: AlunoService) {}

  criarAluno(a: Aluno): void {
    this.alunoService.criar(a).subscribe(
      (ar) => {
        if (ar) {
          this.alunos.push(ar);
          this.aluno = new Aluno();
        } else {
          //this.cpfduplicado = true;
          this.githubDup = true;
        }
      },
      (msg) => {
        alert(msg.message);
      }
    );
  }

  onMove(): void {
    this.cpfduplicado = false;
    this.githubDup = false;
  }

  ngOnInit(): void {
    this.alunoService.getAlunos().subscribe(
      (as) => {
        this.alunos = as;
      },
      (msg) => {
        alert(msg.message);
      }
    );
  }
}
