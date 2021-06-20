Feature: Monitores
As a: Professor
I want to: Cadastrar e gerenciar os monitores das minhas turmas 
So that: Possa manter coerente a organização dos meus monitores, afim de realizar e acompanhar alocações e seus trabalhos.

__Cenários__

Scenario: Cadastro de monitor com sucesso
Given: estou na página “Turma”
And: não vejo o monitor “Lucas Silva” com CPF “14323456700”
When: cadastro o monitor “Lucas Silva” com CPF “14323456700”
Then: vejo uma mensagem de confirmação
And:  estou na página “Turma”
And:  vejo “Lucas Silva” com CPF “14323456700” em “Monitores”
And: vejo que “Lucas Silva” tem um grupo de alunos alocado


Scenario: Cadastro de monitor com falta de informação
Given: estou na página “Turma”
And: não vejo o monitor “Lucas Silva” com CPF “14323456700”
When: cadastro o monitor “Lucas Silva” 
Then:vejo uma mensagem de erro
And:  estou na página “Cadastrar Monitor”