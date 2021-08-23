Feature: As a professor
I want to: Cadastrar e gerenciar os monitores das minhas turmas 
So that: Possa manter coerente a organização dos meus monitores, afim de realizar e acompanhar alocações e seus trabalhos.

Scenario: Cadastro de monitor com sucesso
Given estou na pagina de monitor
Given nao vejo o monitor "Gislayne Vitorino" com CPF "14323456701" e email "gislayne@cin.ufpe.br"
When tento cadastrar o monitor "Gislayne Vitorino" com CPF "14323456701" e email "gislayne@cin.ufpe.br"
Then vejo "Gislayne Vitorino" com CPF "14323456701" e email "gislayne@cin.ufpe.br" na lista de monitores 

Scenario: Cadastro de monitor com CPF existente
Given estou na pagina de monitor
Given vejo o monitor "Bruno Martins" com CPF "14323456700" e email "bruno@cin.ufpe.br" na lista de monitores
When tento cadastrar o monitor "Lucas Silva" com CPF "14323456700" e email "lucas@cin.ufpe.br"
Then nao vejo o monitor "Lucas Silva" com CPF "14323456700" e email "lucas@cin.ufpe.br" na lista de monitores
And vejo uma mensagem de erro

Scenario: Cadastro de monitor sem CPF
Given estou na pagina de monitor
And nao vejo o monitor "Lucas Silva" com CPF "14323456700" e email "lucas@cin.ufpe.br" na lista de monitores
When tento cadastrar o monitor "Lucas Silva" sem CPF e email "lucas@cin.ufpe.br"
Then nao vejo o monitor "Lucas Silva" com CPF "14323456700" e email "lucas@cin.ufpe.br" na lista de monitores
And vejo uma mensagem de  erro

Scenario: Cadastro de monitor com CPF invalido
Given estou na pagina de monitor
Given nao vejo o monitor "Lucas Silva" com CPF "14323456700" e email "lucas@cin.ufpe.br" na lista de monitores
When tento cadastrar o monitor "Lucas Silva" com CPF "2" e email "lucas@cin.ufpe.br"
Then nao vejo o monitor "Lucas Silva" com CPF "2" e email "lucas@cin.ufpe.br" na lista de monitores
And vejo uma mensagem de  erro

Scenario: Remocao de monitor com sucesso
Given estou na pagina de monitor
Given vejo o monitor "Gislayne Vitorino" com CPF "14323456701" e email "gislayne@cin.ufpe.br" na lista de monitores
When tento remover o monitor "Gislayne Vitorino" com CPF "14323456701" e email "gislayne@cin.ufpe.br"
Then nao vejo o monitor "Gislayne Vitorino" com CPF "14323456701" e email "gislayne@cin.ufpe.br" na lista de monitores

Scenario: Atualizacao de monitor com sucesso
Given estou na pagina de monitor
Given vejo o monitor "Gislayne Vitorino" com CPF "14323456701" e email "gislayne@cin.ufpe.br" na lista de monitores
When tento atualizar o monitor Gislayne Vitorino para "Bruno Marcio" com CPF "14323456701" e email "bruno@cin.ufpe.br" 
Then vejo "Bruno Marcio" com CPF "14323456701" e email "bruno@cin.ufpe.br" na lista de monitores
