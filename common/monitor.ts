import { Aluno } from "./aluno";

export class Monitor extends Aluno{
    alunos: Array<string>;

    constructor(){
        super();
        this.clean
    }
    clean(): void{
        //this.nome = "";
        //this.cpf = "";
        //this.email = "";
        //this.github = "";
        this.alunos = new Array<string>();
    }

    copyFrom(from:Monitor):void{
        this.nome = from.nome;
        this.cpf = from.cpf;
        this.email = from.email;
        this.github = from.github;
        this.copyMonitorFrom(from.alunos);
    }
    copyMonitorFrom(from:Array<string>):void{
        this.alunos = new Array<string>();
        for (let key in from){
            this.alunos[key] = from[key];
        }
    }

}   