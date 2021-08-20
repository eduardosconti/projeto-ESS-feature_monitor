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
        var allcpfs : ElementArrayFinder = element.all(by.name('cpflist'));
        var samecpfs = allcpfs.filter(elem =>
                                      elem.getText().then(text => text === cpf));
        await samecpfs.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
    });

    Given(/^vejo o monitor "([^\"]*)" com CPF "(\d*)"$/, async (name, cpf) => {
        await $("input[name='namebox']").sendKeys(<string> name);
        await $("input[name='cpfbox']").sendKeys(<string> cpf);
        await element(by.buttonText('Adicionar')).click();
        
    });
    
    When(/^tento cadastrar o monitor "([^\"]*)" com CPF "(\d*)"$/, async (name, cpf) => {
        await $("input[name='namebox']").sendKeys(<string> name);
        await $("input[name='cpfbox']").sendKeys(<string> cpf);
        await element(by.buttonText('Adicionar')).click();
    });
    Then(/^vejo "([^\"]*)" com CPF "(\d*)" na lista de monitores$/, async (name, cpf) => {
        var allcpfs : ElementArrayFinder = element.all(by.name('cpflist'));
        var allnomes : ElementArrayFinder = element.all(by.name('nomelist'));
        var samecpfs = allcpfs.filter(elem =>elem.getText().then(text => text === cpf));
        var samenomes = allnomes.filter(elem =>elem.getText().then(text => text === name));

        await allcpfs.filter(elem => pAND(samecpfs,samenomes)).then
                   (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
  });

    Then(/^nao vejo o monitor "([^\"]*)" na lista de monitores$/, async (name) => {
        var allnomes : ElementArrayFinder = element.all(by.name('nomelist'));
    var samenomes = allnomes.filter(elem =>
                                  elem.getText().then(text => text === name));
    await samenomes.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
  });

});
