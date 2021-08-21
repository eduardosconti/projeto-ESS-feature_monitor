import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;


let pAND = ((p,q) => p.then(a => q.then(b => a && b)))

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^estou na pagina de cadastro de monitor$/, async () => {
        await browser.get("http://localhost:4200/monitores");
        await expect(browser.getTitle()).to.eventually.equal('TaGui');
    });

    Given(/^nao vejo o monitor com CPF "(\d*)" na lista de monitores$/, async (cpf) => {
        const monitores = await element.all(by.name('monitorlist'))
          .map(async (linhaMonitor) => {
            return {
              cpf: await linhaMonitor.element(by.name('cpflist')).getText(),
            } 
          }) as {cpf: string}[]
    
        expect(monitores.some(monitor => monitor.cpf == cpf)).to.equal(false);
    });

    Given(/^vejo o monitor "([^\"]*)" com CPF "(\d*)" na lista de monitores$/, async (name, cpf) => {

        await $("input[name='namebox']").sendKeys(name as string);
        await $("input[name='cpfbox']").sendKeys(cpf as string);
        await element(by.buttonText('Adicionar')).click();
    
        const monitores = await element.all(by.name('monitorlist'))
          .map(async (linhaMonitor) => {
            return {
              cpf: await linhaMonitor.element(by.name('cpflist')).getText(),
              name: await linhaMonitor.element(by.name('nomelist')).getText(),
            } 
          }) as {cpf: string, name: string}[]
    
        expect(monitores.some(monitor => monitor.cpf == cpf && monitor.name == name)).to.equal(true);
      
    })
    
    When(/^tento cadastrar o monitor "([^\"]*)" com CPF "(\d*)"$/, async (name, cpf) => {
        await $("input[name='namebox']").sendKeys(<string> name);
        await $("input[name='cpfbox']").sendKeys(<string> cpf);
        await element(by.buttonText('Adicionar')).click();
    });
    When(/^tento remover o monitor "([^\"]*)" com CPF "(\d*)"$/, async (name, cpf) => {
      //let list = element.all(by.name('monitorlist'));
      //expect(list.get(0).getText()).toBe(name);
      //await element(by.buttonText('Remover')).click();

     // var elem = element.all(by.name('monitorlist')).first();
     // await element(by.elem.buttonText('Remover')).click();

      await element.all(by.buttonText('Remover')).first().click()
  });

  //let list = element.all(by.css('.numbers li'));

//expect(list.get(2).getText()).toBe('Three');

    Then(/^vejo "([^\"]*)" com CPF "(\d*)" na lista de monitores$/, async (name, cpf) => {
  
        const monitores = await element.all(by.name('monitorlist'))
          .map(async (linhaMonitor) => {
            return {
              cpf: await linhaMonitor.element(by.name('cpflist')).getText(),
              name: await linhaMonitor.element(by.name('nomelist')).getText(),
            } 
          }) as {cpf: string, name: string}[]
    
        expect(monitores.some(monitor => monitor.cpf == cpf && monitor.name == name)).to.equal(true);
  });

    Then(/^nao vejo o monitor "([^\"]*)" com CPF "(\d*)" na lista de monitores$/, async (name, cpf) => {
  
        const monitores = await element.all(by.name('monitorlist'))
          .map(async (linhaMonitor) => {
            return {
              cpf: await linhaMonitor.element(by.name('cpflist')).getText(),
              name: await linhaMonitor.element(by.name('nomelist')).getText(),
            } 
          }) as {cpf: string, name: string}[]
    
        expect(monitores.some(monitor => monitor.cpf == cpf && monitor.name == name)).to.equal(false);
  });
    Then(/^vejo uma mensagem de erro$/, async () => {

        var allmsgs : ElementArrayFinder = element.all(by.name('msgcpfexistente'));
        await allmsgs.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
  });

});
