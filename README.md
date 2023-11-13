# Chopper - bot p/ staff de design

O bot Chopper é uma ferramenta para agilizar aquelas tarefas chatas e repetitivas no gerenciamento do seu servidor da staff de design.

## Dependências
- Git
- Bun

## Download
```bash
git clone git@github.com/claudiogofe/chopper
```

## Ambient Variables

Antes de iniciar o bot, você precisa se certificar que as seguintes variáveis de ambiente estão configuradas corretamente:

- **CLIENT_SECRET:** O token da aplicação, pode ser encontrado em discord.com/developers.
- **APPLICATION_ID:** O ID da aplicação, pode ser encontrado em discord.com/developers.
- **LEADER_ROLE_ID:** O ID do cargo de liderança no servidor da área.

Exemplo de **.env** com valores indefinidos:
```shell
CLIENT_SECRET=
APPLICATION_ID=
LEADER_ROLE_ID=
```

## Inicialização
Apenas oferecemos suporte à engine do **bun** para executar o bot.

Após baixar o repositório, para iniciar o bot é necessário baixar também os pacotes necessários e rodar comando de inicialização, como no exemplo:

```bash
bun install # Instala dependências do package.json
bun run start # Inicia a execução do bot
```