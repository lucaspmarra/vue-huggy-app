
![Logo da Huggy](https://developers.huggy.io/huggy-icon.png)

# Lista de Contatos - Huggy API v3

O sistema proposto utiliza a [API v3 da Huggy](https://developers.huggy.io/API/api-v3.html#authentication), que por sua vez, é a forma de consumo dos dados que estão diretamente linkados a um Aplicativo dentro da conta de um usuário.

Para utilizar o projeto é necessário gerar um token Bearer, siga os passos que constam na [Huggy Spotlight¹](https://spotlight.huggy.io/publications/autentique-a-api-da-huggy?utm_source=developers&utm_medium=API_v3&utm_campaign=SPOT_Developers&utm_term=hyperlink&utm_content=exemplos_praticos).
## Funcionalidades

- Listagem de todos os contatos de uma conta Huggy;
- Visualização das informações dos contatos, tais como: nome, foto, e-mail, telefone e
endereço;
- Cadastro de um novo contato;
- Exclusão de um contato;
- Busca por contatos;
- Modal e Botões componentizados para reutilização;
- Responsivo para mobile;

## Funcionalidades não realizadas

- Autenticação;
- Mensagem de confirmação antes da exclusão;
- Validação de campos do input;
- Embed;
## Instalação

Crie um arquivo chamado `.env` na raiz do projeto com a variável `VITE_BEARER_TOKEN` com o token recebido nos passos descritos no ponto 1 da introdução.

- Exemplo: `VITE_BEARER_TOKEN=BeArErToKeN9999999`

No component `ContactView.vue`, comente a linha de código `const BearerToken = process.env.VITE_BEARER_TOKEN;`que está utilizando o Secret Token do GitHub Actions e retire o comentário do `const BearerToken = import.meta.env.VITE_BEARER_TOKEN;` para utilizar o .env localmente.
## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/lucaspmarra/vue-huggy-app
```

Entre no diretório do projeto

```bash
  cd vue-huggy-app
```

Instale as dependências utilizando `yarn`

```bash
  yarn
```

Inicie o servidor local

```bash
  yarn dev
```


## Stack utilizada

**Front-end:** Vue 3 Composition API

**Http-Client:** Axios

## Documentação da API

#### Retorna todos os contatos cadastrados

```http
  GET /contacts
```

| Parâmetro | Tipo     | Descrição    |
| :-------- | :------- | :----------- |
| `name`    | `string` | **Opcional** |
| `email`   | `string` | **Opcional** |

#### Retorna um contato

```http
  GET /contacts/${id}
```

| Parâmetro | Tipo     | Descrição                                       |
| :-------- | :------- | :---------------------------------------------- |
| `id`      | `string` | **Obrigatório** - O ID do contato que você quer |

#### Cria um novo contato

```http
  POST /contacts/${id}
```

| Parâmetro | Tipo     | Descrição                          |
| :-------- | :------- | :--------------------------------- |
| `name`    | `string` | **Obrigatório** - Nome do contato  |
| `email`   | `string` | **Obrigatório** - Email do contato |

#### Deleta um contato

```http
  DELETE /contacts/${id}
```

| Parâmetro | Tipo     | Descrição                                               |
| :-------- | :------- | :------------------------------------------------------ |
| `id`      | `string` | **Obrigatório** - O ID do contato que você quer excluir |
