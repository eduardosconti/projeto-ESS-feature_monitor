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
        this.alunos = [];
    }


}   