class LoginPage {

  visitarPagina() {
    cy.visit('/login-unico/login')
  }

  preencherEmail(email) {
  if (!email) return

  cy.get("form#formLogin")
    .find("input#email[name='email'][type='email']")
    .should("be.visible")
    .and("be.enabled")
    .clear()
    .type(email)
}

  preencherSenha(senha) {
  if (!senha) return

  cy.get("form#formLogin")
    .find("input#senha[name='senha'][type='password']")
    .should("be.visible")
    .and("be.enabled")
    .clear()
    .type(senha, { log: false })
}

  clicarBotaoLogin() {
  cy.get("#formLoginButtonSubmit")
    .should("be.visible")
    .and("not.be.disabled")
    .click()
}


  realizarLogin(email, senha) {
    this.visitarPagina()
    this.preencherEmail(email)
    this.preencherSenha(senha)
    this.clicarBotaoLogin()
  }

  lerTextoComOResultadoDepoisDeTentarLogin() {
    cy.log("INICIO lerResultadoLogin")

    return cy.get("#txtUsuarioLogado")
      .should("be.visible")
      .invoke("text")
      .then(textoBruto => {
        // aqui nao pode ter cy.log
        return String(textoBruto).replace(/\s+/g, " ").trim()
      })
      .then(textoLimpo => {
        // aqui pode ter cy.log, mas nao pode retornar string pura
        cy.log("ETAPA texto limpo: " + textoLimpo)
        console.log("lerResultadoLogin textoLimpo:", textoLimpo)

        cy.log("FIM lerResultadoLogin")
        return cy.wrap(textoLimpo, { log: false })
      })
  }





  validarLogin(textoLido) {
    cy.log("INICIO loginValido")

    return cy.fixture("LoginData").then(dados => {
      const textoEsperado = String(dados.textoAreaExclusiva).trim()
      const textoTela = String(textoLido || "").replace(/\s+/g, " ").trim()

      cy.log("#rrr textoEsperado JSON: " + textoEsperado)
      cy.log("#rrr textoLido Tela: " + textoTela)

      const sucesso = textoTela.includes(textoEsperado)

      cy.log("comparacao includes resultado: " + String(sucesso))
      cy.log("FIM loginValido")

      expect(
        sucesso,
        "Login deveria conter o texto esperado do fixture"
      ).to.eq(true)

      return cy.wrap(sucesso, { log: false })
    })
  }

  validarMensagemErroGeral(mensagemEsperada) {
      return cy
        .get("#valid_geral")
        .should("be.visible")
        .invoke("text")
        .then(texto => {
          const textoLimpo = String(texto).replace(/\s+/g, " ").trim()
          expect(textoLimpo).to.contain(mensagemEsperada)
        })
}


}

export default new LoginPage()
