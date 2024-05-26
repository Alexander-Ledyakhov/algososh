describe('app works correctly with routes', ()=> {

    beforeEach(()=> cy.visit(`/`));

    it('Доступность начальной страницы', function() {
        cy.contains('МБОУ АЛГОСОШ');
    });

    it('Доступность страницы: recursion', ()=> {
        cy.visit(`/recursion`)
        cy.contains('Строка');
    })

    it('Доступность страницы: fibonacci', ()=> {
        cy.visit(`/fibonacci`)
        cy.contains('Фибоначчи');
    })

    it('Доступность страницы: sorting', ()=> {
        cy.visit(`/sorting`)
        cy.contains('Сортировка массива');
    })

    it('Доступность страницы: stack', ()=> {
        cy.visit(`/stack`)
        cy.contains('Стек');
    })

    it('Доступность страницы: queue', ()=> {
        cy.visit(`/queue`)
        cy.contains('Очередь');
    })

    it('Доступность страницы: list', ()=> {
        cy.visit(`/list`)
        cy.contains('Связный список');
    })
})