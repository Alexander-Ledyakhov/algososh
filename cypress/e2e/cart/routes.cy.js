import data from '../../fixtures/example.json'

describe('app works correctly with routes', ()=> {

    beforeEach(()=> cy.visit(`${data.baseUrl}`));

    it('Доступность начальной страницы', function() {
        cy.contains('МБОУ АЛГОСОШ');
    });

    it('Доступность страницы: recursion', ()=> {
        cy.get('a').eq(0).click();
        cy.contains('Строка');
    })

    it('Доступность страницы: fibonacci', ()=> {
        cy.get('a').eq(1).click();
        cy.contains('Фибоначчи');
    })

    it('Доступность страницы: sorting', ()=> {
        cy.get('a').eq(2).click();
        cy.contains('Сортировка массива');
    })

    it('Доступность страницы: stack', ()=> {
        cy.get('a').eq(3).click();
        cy.contains('Стек');
    })

    it('Доступность страницы: queue', ()=> {
        cy.get('a').eq(4).click();
        cy.contains('Очередь');
    })

    it('Доступность страницы: list', ()=> {
        cy.get('a').eq(5).click();
        cy.contains('Связный список');
    })
})