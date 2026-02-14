import LoginPage from '../../pages/LoginPage'

describe('Login - Minha Conta EBAC', () => {

  beforeEach(() => {
    cy.fixture('loginData').as('login')
  })

  //cccenario de senha vakuda
  it("Login valido caminho feliz", function () {
      cy.log("ETAPA 1 iniciar login")

      // ETAPA 1 executar login
      LoginPage.realizarLogin(
        this.login.loginValido.email,
        this.login.loginValido.senha
      )

      cy.log("ETAPA 2 ler texto da tela apos login")

      // ETAPA 2 ler texto exibido apos login
      LoginPage.lerTextoComOResultadoDepoisDeTentarLogin().then(textoLidoDaTela => {

        cy.log("ETAPA 3 guardar texto lido em variavel")
        cy.log("Texto lido da tela: " + textoLidoDaTela)

        cy.log("ETAPA 4 validar resultado do login")

        // ETAPA 4 comparar com o fixture
        LoginPage.validarLogin(textoLidoDaTela)

      })

      cy.log("ETAPA FINAL fim do teste de login valido")
  })


  it("Email inválido", function () {

        cy.log("ETAPA 1 tentar login com email inválido")

        LoginPage.realizarLogin(
          this.login.emailInvalido.email,
          this.login.emailInvalido.senha
        )

        cy.log("ETAPA 2 validar mensagem de erro exibida")

        LoginPage.validarMensagemErroGeral(
          this.login.emailInvalido.mensagemErro
        )
})

})
