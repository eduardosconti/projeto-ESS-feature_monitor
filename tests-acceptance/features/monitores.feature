Feature: As a professor
I want to: Cadastrar e gerenciar os monitores das minhas turmas 
So that: Possa manter coerente a organização dos meus monitores, afim de realizar e acompanhar alocações e seus trabalhos.

Scenario: Cadastro de monitor com sucesso
Given estou na pagina de cadastro de monitor
Given nao vejo o monitor com CPF "14323456701" na lista de monitores
When tento cadastrar o monitor "Gislayne Vitorino" com CPF "14323456701"
Then vejo "Gislayne Vitorino" com CPF "14323456701" na lista de monitores 

Scenario: Cadastro de monitor com CPF existente
Given estou na pagina de cadastro de monitor
Given vejo o monitor "Bruno Martins" com CPF "14323456700" na lista de monitores
When tento cadastrar o monitor "Lucas Silva" com CPF "14323456700"
Then nao vejo o monitor "Lucas Silva" com CPF "14323456700" na lista de monitores
And vejo uma mensagem de erro