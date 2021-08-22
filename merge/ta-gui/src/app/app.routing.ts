import { Routes } from "@angular/router";
import { AlunosComponent } from "./pages/alunos/alunos.component";
import { MonitoresComponent } from "./pages/monitores/monitores.component";

export const routes: Routes = [
    {
        path: 'alunos',
        component: AlunosComponent
    },
    {
        path: 'monitores',
        component: MonitoresComponent
    }
]