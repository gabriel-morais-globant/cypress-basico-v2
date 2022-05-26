/// <reference types="Cypress" />
describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should(
            'be.equal',
            'Central de Atendimento ao Cliente TAT'
        )
    })

    it('preenche os campos obrigatórios e envia o formulário', ()=>{
        const longText = 'These are helpful to set conditions that you want to run before a set of tests or before each test. They\'re also helpful to clean up conditions after a set of tests or after each test.';
        cy.get('#firstName').type('Gabriel')
        cy.get('#lastName').type('Morais')
        cy.get('#email').type('gabriel.morais@globant.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button','Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', ()=>{

        cy.get('#firstName').type('Gabriel')
        cy.get('#lastName').type('Morais')
        cy.get('#email').type('invalido')
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type=submit]').click()

        cy.get('.error').should('be.visible')

    })

    it('campo de telefone continua vazio quando preenchido com valor nao-numerico', ()=>{
        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', ()=>{

        cy.get('#firstName').type('Gabriel')
        cy.get('#lastName').type('Morais')
        cy.get('#email').type('email@email.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type=submit]').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', ()=> {
        cy.get('#firstName')
            .type('Gabriel')
            .should('have.value','Gabriel')
            .clear()
            .should('have.value','')

        cy.get('#lastName')
            .type('Morais')
            .should('have.value','Morais')
            .clear()
            .should('have.value','')

        cy.get('#email')
            .type('gabriel.morais@globant.com')
            .should('have.value','gabriel.morais@globant.com')
            .clear()
            .should('have.value','')

    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('button[type=submit]').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', ()=> {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', ()=> {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', ()=> {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', ()=> {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', ()=> {
        cy.get('input[type=radio][value=feedback]')
            .check()
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', ()=> {
        cy.get('input[type=radio]')
            .should('have.length', 3)
            .each(function($radio){
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it.only('seleciona um arquivo da pasta fixtures', ()=> {
        cy.get('input[type=file]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($fileInput){
                expect($fileInput[0].files[0].name).to.equal('example.json')
            })
    })
})
