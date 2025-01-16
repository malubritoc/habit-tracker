# HabitTracker

Bem-vindo ao repositório do projeto do HabitTracker! Este projeto foi desenvolvido utilizando diversas tecnologias e bibliotecas modernas para fornecer uma experiência de usuário rica e interativa.

## Ambiente de produção

Para visualizar a aplicação em produção, acesse:

```bash
   https://habit-tracker-nine-tawny.vercel.app
```

## Tecnologias Utilizadas

- **Next.js**: Framework React para construção de aplicações web.
- **Tailwind**: Framework CSS para estilização de componentes.
- **TypeScript**: Superconjunto do JavaScript que adiciona tipagem estática.
- **Firebase**: Utilização do serviço Firestore para banco de dados NoSql, serviços de API e autenticação.

### Bibliotecas

- **clsx**: Utilizada para melhorar a visualização da estilização com Tailwind CSS.
- **Zod**: Utilizada para criar esquemas de formulários.
- **Lucide**: Utilizada como fonte de ícones svg.

### UI

- **shadcn**: Coleção de componentes reutilizáveis utilizada para criar componentes.

## Funcionalidades

- **Páginas de Sign In**: Página para login de usuários.
- **Página de SignUp**: Página para cadastrar novos usuários.
- **Página de Início**: Página inicial para visualização e alteração de status dos registros diários de hábitos.
- **Página de Perfil**: Página para visualizar e editar dados pessoais.
- **Página de Progressos**: Página para visualizar métricas acerca dos registros de hábitos.
- **Modal de Adição de Hábito**: Modal para adicionar novos hábitos

## Instalação

Siga os passos abaixo para configurar e executar o projeto localmente.

### Pré-requisitos

Certifique-se de ter o Node.js e o npm instalados na sua máquina.

### Passo a Passo

1. Clone o repositório:

   ```bash
   git clone https://github.com/malubritoc/habit-tracker.git
   cd habit-tracker
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Execute o projeto:

   ```bash
   npm run dev
   ```

4. Abra o navegador e acesse http://localhost:3000 para ver a aplicação em execução.

## Uso da Aplicação

### Páginas de Sign In:

##### Caso você não possua uma conta

1. Acesse "/" e clique na opcão "Criar uma conta agora";

2. Você será redirecionado para a página de sign up ("/signup");

##### Caso você já possua uma conta

1. Acesse "/" e preencha o formulário com suas credenciais E-mail e Senha;

2. Clique em "Entrar". Se tudo der certo, você será redirecionado para o ambiente autenticado da página inicial ("/home").

### Página de SignUp:

1. Acesse a página de sign up clicando em "Criar uma conta agora" da página "/";

2. Preencha o formulário com seus dados pessoais Nome e E-mail e defina uma senha;
   PS.: Os valores do campo "senha" e "confirme sua senha" devem ser idênticos.

3. Clique em "Entrar". Se tudo der certo, você será redirecionado para a página de sign in ("/").

### Página de Início

##### Caso possua hábitos

1. Acesse a página de início clicando no ícone de casa do menu superior;

2. Visualize a data atual;

3. Visualize seus hábitos programados para o dia;

4. Registre o cumprimento de um hábito clicando em seu respectivo card;

5. Ao ser registrado, o card de hábito deverá mudar da cor vermelha para verde.

### Página de Perfil:

1. Acesse a página de perfil clicando na opção "Meu Perfil" do menu dropdow renderizado ao clicar no ícone de usuário do menu superior;

2. Visualize seus dados cadastrados Nome e E-mail;

3. Clique em "Editar Perfil";

4. Os campos de input possivelmente editáveis (nome) iram ficar habilitados;

5. Altere os dados desejados e clique em "Salvar Alterações".

### Página de Progressos:

1. Acesse a página de perfil clicando na opção "Meu Progresso" do menu dropdow renderizado ao clicar no ícone de usuário do menu superior;

2. Defina o escopo dos resultados que deseja visualizar clicando nas opcões (Por Hábito ou Geral) localizadas logo abaixo do título;

##### Caso selecione a opção "Por Hábito"

3. Clique na barra com o nome do hábito desejado;

4. Se tudo der certo, o accordion se abrirá e você poderá visualizar os detalhes e métricas (esta última, pendente até o momento) do hábito desejado.

##### Caso selecione "Geral"

3. Visualize os detalhes e métricas (esta última, pendente até o momento) gerais, sobre todos os hábitos.

### Modal de Adição de Hábito:

1. Clique no ícone de Mais (+) no menu superior;

2. Se tudo der certo, deverá se abrir na tela um modal referente à adição de novos hábitos;

3. Preencha o formulário com os dados do hábito que deseja monitorar (Nome e Descrição) e selecione uma opção de frequência;

##### Caso selecione uma frequência diferente de "Diário"

4. Aparecerá uma nova seção no formulário para seleção dos dias que deseja programar o hábito a ser cadastrado;

5. Selecione uma quantidade de dias compatível com a frequência selecionada anteriormente;

6. Clique em "Adicionar novo hábito";

7. Você já poderá visualizar o novo hábito no accordion da tela de "Meu Progresso" e caso ele esteja programado para o dia corrente, já deverá poder visualizá-lo na tela inicial

### Log Out:

1. Faça o log ou clicando na opção "Sair" do menu dropdow renderizado ao clicar no ícone de usuário do menu superior;

### Feedbacks do usuário:

1. Os feedbacks de sucesso e erro das requisições para o usuário acontecem por meio de toasts;

2. Os feedbacks de erro dos formulários acontecem por meio de mensagens logo abaixo do input equivocado.

## Sugestões de testes de fluxo

### Testes de Sign In

- Solicitar o login sem os campos do formulário preenchidos;
- Solicitar o login com credenciais aleatórias ou no formato incorrento (ex.: email fora do formato padrão nome@dominio.com);
- Solicitar o login com credenciais cadastradas (vide Uso da Aplicação).

### Testes de Sign Up

- Solicitar o sign up sem os campos do formulário preenchidos;
- Solicitar o sign up com credenciais já existentes;
- Solicitar o sign up com os campos de "senha" e "confirme sua senha" preechidos divergentemente;
- Solicitar o sign up com informações válidas (vide Uso da Aplicação).

### Testes da Página Inicial

- Solicitar a alteração de status de um card de hábito (vide Uso da Aplicação).

### Testes da Página Meu Perfil

- Solicitar a alteração de dados do perfil (vide Uso da Aplicação).

### Testes da Página Meu Progresso

- Solicitar a alternância do escopo entre as opções "Por Hábito" e "Geral";
- Solicitar a visualização de dados de um hábito (vide Uso da Aplicação).

### Testes do Modal Adição de Hábito

- Solicitar a adição de hábito sem os campos do formulário preenchidos;
- Solicitar a adição de hábito sem os campos obrigatórios do formulário (nome, frequência e dias) preenchidos;
- Solicitar a adição de dados com número de dias divergente em relação à frequência selecionada;

## Melhorias pendentes

- **Responsividade**: Atualmente, a aplicação não está 100% responsiva, portanto, uma melhoria identificada seria ⁠criar o design para uma versão mobile responsiva, bem como sua respectiva implementação;
- **Métricas do progresso**: Um obstáculo encontrado foi manipular os dados para obter métricas reais quanto ao progresso do usuário com o firebase, portanto, esses dados ainda estão estáticos.
