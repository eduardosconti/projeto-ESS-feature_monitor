Feature: As a professor
I want to: Cadastrar e gerenciar os monitores das minhas turmas 
So that: Possa manter coerente a organização dos meus monitores, afim de realizar e acompanhar alocações e seus trabalhos.

Scenario: Cadastro de monitor com sucesso
Given estou na página de cadastro de monitor
Given não vejo o monitor com CPF "14323456700" na lista de monitores
When tento cadastrar o monitor "Lucas Silva" com CPF "14323456700"
Then vejo "Lucas Silva" com CPF "14323456700" na lista de monitores