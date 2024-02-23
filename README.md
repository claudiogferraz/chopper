# Chopper

O bot **Chopper** é uma ferramenta para agilizar aquelas tarefas chatas e repetitivas no gerenciamento do seu servidor da staff de design.

## Dependências
- git
- bun

## Download
Para baixar o repositório execute o seguinte comando no terminal:
```sh
git clone git@github.com/claudiogofe/chopper
```

## .env Variables

Antes de iniciar o bot, você precisa se certificar que as seguintes variáveis de ambiente estão configuradas corretamente:

- **CLIENT_SECRET:** O token da aplicação, pode ser encontrado em discord.com/developers.
- **APPLICATION_ID:** O ID da aplicação, pode ser encontrado em discord.com/developers.
- **LEADER_ROLE_ID:** O ID do cargo de liderança no servidor da área.

Exemplo de **.env** com valores indefinidos:
```sh
CLIENT_SECRET=
APPLICATION_ID=
LEADER_ROLE_ID=
```

## Inicialização

Após baixar o repositório, para iniciar o bot é necessário baixar também os pacotes necessários e rodar comando de inicialização, como no exemplo:

```sh
bun install # Instala dependências do package.json
bun start # Inicia a execução do bot
```

## Comandos

- **/pontos** - Retorna a pontuação de todas as artes enviadas nos portfolios durante a semana, desde o último sábado ao meio-dia.
- **/anterior** - Retorna a pontuação de todas as artes enviadas nos portfolios durante a semana anterior, desde sábado ao meio-dia.

## Info

Bot desenvolvido por **[@claudiogofe](https://claudiogofe.com)** para a staff de design da **[CDW](https://discord.gg/cdw)**.

<sub>Claudio Gofe © 2023</sub>