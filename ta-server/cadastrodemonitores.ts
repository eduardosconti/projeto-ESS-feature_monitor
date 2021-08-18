import { Monitor } from "../common/monitor";
import { Aluno } from "../common/aluno";

export class CadastroDeMonitores {
    monitores: Monitor[] = [];
 
    cadastrar (monitor: Monitor): Monitor {
        var result = null;
        if (this.cpfNaoCadastrado(monitor.cpf)){
            result = new Monitor();
            result.copyFrom(monitor);
            this.monitores.push(result);
            result = this.monitores[this.monitores.length - 1];
        }
        return result;
    }
    remover (monitor: Monitor): void {
        var result = null;
        if (!this.cpfNaoCadastrado(monitor.cpf)){
            var aux : Monitor = this.monitores.find(k => k.cpf == monitor.cpf);
            this.monitores.splice(this.monitores.indexOf(aux),1);
        }
    }

    cpfNaoCadastrado(cpf: string): boolean {
        return !this.monitores.find(a => a.cpf == cpf);
     }
  
    atualizar(monitor: Monitor): Monitor {
       var result: Monitor = this.monitores.find(a => a.cpf == monitor.cpf);
       if (result) result.copyFrom(monitor);
       return result;
     }
  
    getMonitores(lista: Aluno[]): Monitor[] {
        this.listaAlunos(lista);
        return this.monitores;
     }
     
    listaAlunos(arrAluno: Aluno[]): void {
        let aux = arrAluno.reverse();
        let tamanhoA = aux.length;
        let monRestantes = this.monitores.length;
        let n = 0
        let aPerm = Math.ceil(tamanhoA/monRestantes);
        if (tamanhoA > 0){
            for (let mon of this.monitores) {
                mon.alunos = [];
                tamanhoA = aux.length - n;
                aPerm = Math.ceil(tamanhoA/monRestantes);
                for (let i = 0 + n; i < aPerm + n; i++) {
                    mon.alunos = mon.alunos.concat(aux[i].nome); 
                }
                n += aPerm;
                monRestantes -=1;
            }
        }

    }

}