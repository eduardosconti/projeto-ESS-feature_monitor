import { Monitor } from "../common/monitor";

export class CadastroDeMonitores {
    monitores: Monitor[] = [];

    cadastrar (monitor: Monitor): Monitor {
        var result = null;
        if (this.cpfNaoCadastrado(monitor.cpf)){
            result = new Monitor();
            result.copyFrom(monitor);
            this.monitores.push(result);
        }
        return result;
    }
    cpfNaoCadastrado(cpf: string): boolean {
        return !this.monitores.find(a => a.cpf == cpf);
     }
  
    atualizar(monitor: Monitor): Monitor {
       var result: Monitor = this.monitores.find(a => a.cpf == monitor.cpf);
       if (result) result.copyFrom(monitor);
       return result;
     }
  
    getMonitores(): Monitor[] {
       return this.monitores;
     }
}