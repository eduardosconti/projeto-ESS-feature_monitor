import express = require('express');
import bodyParser = require("body-parser");

import {Aluno} from '../common/aluno';
import {CadastroDeAlunos} from './cadastrodealunos';

import {Monitor} from '../common/monitor';
import { CadastroDeMonitores } from './cadastrodemonitores';

var taserver = express();

var cadastro: CadastroDeAlunos = new CadastroDeAlunos();
var cadastrom: CadastroDeMonitores = new CadastroDeMonitores();

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
taserver.use(allowCrossDomain);

taserver.use(bodyParser.json());

taserver.get('/alunos', function (req: express.Request, res: express.Response) {
  res.send(JSON.stringify(cadastro.getAlunos()));
})

taserver.get('/monitores', function (req: express.Request, res: express.Response) {
  var lista = cadastro.getAlunos();
  res.send(JSON.stringify(cadastrom.getMonitores(lista)));
})

taserver.post('/aluno', function (req: express.Request, res: express.Response) {
  var aluno: Aluno = <Aluno> req.body; //verificar se � mesmo Aluno!
  aluno = cadastro.cadastrar(aluno);
  if (aluno) {
    res.send({"success": "O aluno foi cadastrado com sucesso"});
  } else {
    res.send({"failure": "O aluno nao pode ser cadastrado"});
  }
})

taserver.post('/monitores', function (req: express.Request, res: express.Response) {
  var monitor: Monitor = <Monitor> req.body;
  monitor = cadastrom.cadastrar(monitor);
  if (monitor) {
    res.send({"success": "O monitor foi cadastrado com sucesso"});
  } else {
    res.send({"failure": "O monitor nao pode ser cadastrado"});
  }
})

taserver.put('/monitores',function(req:express.Request,res:express.Response){
  var monitor : Monitor = <Monitor> req.body;
  monitor = cadastrom.remover(monitor)
  if (monitor){
    res.send({"success": "O Monitor foi removido com sucesso"});
  } else {
    res.send({"failure": "O Monitor nao pode ser encontrado"});
  }
})

taserver.put('/aluno', function (req: express.Request, res: express.Response) {
  var aluno: Aluno = <Aluno> req.body;
  aluno = cadastro.atualizar(aluno);
  if (aluno) {
    res.send({"success": "O aluno foi atualizado com sucesso"});
  } else {
    res.send({"failure": "O aluno nao pode ser atualizado"});
  }
})

taserver.put('/monitores', function (req: express.Request, res: express.Response) {
  var monitor: Monitor = <Monitor> req.body;
  monitor = cadastrom.atualizar(monitor);
  if (monitor) {
    res.send({"success": "O monitor foi atualizado com sucesso"});
  } else {
    res.send({"failure": "O monitor nao pode ser atualizado"});
  }
})

taserver.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})