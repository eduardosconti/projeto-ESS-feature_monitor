import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;


let pAND = ((p,q) => p.then(a => q.then(b => a && b)))

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^estou na pagina de monitor$/, async () => {
        await browser.get("http://localhost:4200/monitores");
        await expect(browser.getTitle()).to.eventually.equal('TaGui');

    });

    Given(/^nao vejo o monitor "([^\"]*)" com CPF "(\d*)" e email "([^\"]*)"$/, async (name,cpf,email) => {
        const monitores = await element.all(by.name('monitorlist'))
          .map(async (linhaMonitor) => {
            return {
              cpf: await linhaMonitor.element(by.name('cpflist')).getText(),
              name: await linhaMonitor.element(by.name('nomelist')).getText(),
              email: await linhaMonitor.element(by.name('emaillist')).getText(),
            } 
          }) as {cpf: string, name: string, email: string}[]
    
        expect(monitores.some(monitor => monitor.cpf == cpf && monitor.name == name && monitor.email == email  )).to.equal(false);
    });

    Given(/^vejo o monitor "([^\"]*)" com CPF "(\d*)" e email "([^\"]*)" na lista de monitores$/, async (name, cpf,email) => {

        await $("input[name='namebox']").sendKeys(name as string);
        await $("input[name='cpfbox']").sendKeys(cpf as string);
        await $("input[name='emailbox']").sendKeys(email as string);
        await element(by.buttonText('Adicionar')).click();
    
        const monitores = await element.all(by.name('monitorlist'))
          .map(async (linhaMonitor) => {
            return {
              cpf: await linhaMonitor.element(by.name('cpflist')).getText(),
              name: await linhaMonitor.element(by.name('nomelist')).getText(),
              email: await linhaMonitor.element(by.name('emaillist')).getText(),
            } 
          }) as {cpf: string, name: string, email: string}[]
    
        expect(monitores.some(monitor => monitor.cpf == cpf && monitor.name == name && monitor.email == email)).to.equal(true);
      
    });
    
    When(/^tento cadastrar o monitor "([^\"]*)" com CPF "(\d*)" e email "([^\"]*)"$/, async (name, cpf, email) => {
        await $("input[name='namebox']").sendKeys(<string> name);
        await $("input[name='cpfbox']").sendKeys(<string> cpf);
        await $("input[name='emailbox']").sendKeys(<string> email);
        await element(by.buttonText('Adicionar')).click();
    });
    When(/^tento remover o monitor "([^\"]*)" com CPF "(\d*)" e email "([^\"]*)"$/, async (name, cpf,email) => {
      await element.all(by.buttonText('Remover')).click();
      await element.all(by.buttonText('Remover')).click();
  });
    When(/^tento cadastrar o monitor "([^\"]*)" sem CPF e email "([^\"]*)"$/, async (name, email) => {
    await $("input[name='namebox']").sendKeys(<string> name);
    await $("input[name='emailbox']").sendKeys(<string> email);
    await element(by.buttonText('Adicionar')).click();
  });
  When(/^tento cadastrar um monitor sem nome com CPF "(\d*)" e email "([^\"]*)"$/, async (cpf, email) => {
    await $("input[name='cpfbox']").sendKeys(<string> cpf);
    await $("input[name='emailbox']").sendKeys(<string> email);
    await element(by.buttonText('Adicionar')).click();
  });
  
  When(/^tento atualizar o monitor Gislayne Vitorino para "([^\"]*)" com CPF "(\d*)" e email "([^\"]*)"$/, async (name, cpf,email) => {
    await element(by.buttonText('Atualizar')).click();
    
    element(by.name("atualizaremailbox")).clear();
    element(by.name("atualizarnamebox")).clear();
    element(by.name("atualizarnamebox")).clear();

    await $("input[name='atualizarnamebox']").sendKeys(<string> name);
    await $("input[name='atualizaremailbox']").sendKeys(<string> email);
    await element(by.buttonText('Salvar')).click();
});
    
    Then(/^vejo "([^\"]*)" com CPF "(\d*)" e email "([^\"]*)" na lista de monitores$/, async (name, cpf, email) => {
  
        const monitores = await element.all(by.name('monitorlist'))
          .map(async (linhaMonitor) => {
            return {
              cpf: await linhaMonitor.element(by.name('cpflist')).getText(),
              name: await linhaMonitor.element(by.name('nomelist')).getText(),
              email: await linhaMonitor.element(by.name('emaillist')).getText(),
            } 
          }) as {cpf: string, name: string, email: string}[]
    
        expect(monitores.some(monitor => monitor.cpf == cpf && monitor.name == name  && monitor.email == email)).to.equal(true);
   
  });

    Then(/^nao vejo o monitor "([^\"]*)" com CPF "(\d*)" e email "([^\"]*)" na lista de monitores$/, async (name, cpf, email) => {
  
        const monitores = await element.all(by.name('monitorlist'))
          .map(async (linhaMonitor) => {
            return {
              cpf: await linhaMonitor.element(by.name('cpflist')).getText(),
              name: await linhaMonitor.element(by.name('nomelist')).getText(),
              email: await linhaMonitor.element(by.name('emaillist')).getText(),
            } 
          }) as {cpf: string, name: string, email:string}[]
    
        expect(monitores.some(monitor => monitor.cpf == cpf && monitor.name == name && monitor.email == email)).to.equal(false);
        
  });
    Then(/^vejo uma mensagem de erro$/, async () => {

        var allmsgs : ElementArrayFinder = element.all(by.name('msgcpfexistente'));
        await allmsgs.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        
  });
  Then(/^vejo uma mensagem de  erro$/, async () => {

    var allmsgs : ElementArrayFinder = element.all(by.name('msgcpfvalido'));
    await allmsgs.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    
});
Then(/^vejo uma  mensagem de erro$/, async () => {

  var allmsgs : ElementArrayFinder = element.all(by.name('nomeinvalido'));
  await allmsgs.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
  
});

});

