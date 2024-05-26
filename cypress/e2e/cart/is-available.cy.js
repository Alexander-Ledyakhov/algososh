
describe('service is available', function() {

  beforeEach(() => {
    cy.fixture('example').then(function (data) {
      this.baseUrl = data.baseUrl
    })
  })

  it('should be available on localhost:3000', function() {
    cy.visit(this.baseUrl);
  });

});