# Objetivo
<p>O objetivo consiste em criar um Sistema de Planejamento de Recursos Empresariais (ERP) voltado especificamente para o setor de marcenaria. Este ERP adota uma abordagem modular, permitindo que os clientes escolham e implementem apenas as funcionalidades que melhor atendam às suas operações, resultando em economia de recursos e uma solução personalizada para suas necessidades</p> 

# Escopo
  1. Desenvolvimento de uma aplicação de software como serviço (SaaS).
  2. **Funcionalidades Modulares:**
      - **Gerenciamento Financeiro:** Desenvolvimento de funcionalidades para controlar transações financeiras, cálculo de saldo de caixa, geração de relatórios financeiros e configuração de alertas.
      - **Cadastros de Usuários:** Criação de um sistema de cadastro de usuários com autenticação segura, permitindo que cada usuário acesse suas funcionalidades autorizadas.
      - **Cadastros de Clientes e Fornecedores:** Desenvolvimento de funcionalidades para registrar e gerenciar informações detalhadas de clientes e fornecedores, incluindo nome, contato, endereço e outras informações relevantes.
      - **Gestão de Projetos:** Desenvolvimento de recursos para gerenciar projetos, incluindo acompanhamento do progresso, alocação de recursos e controle de prazos. (Atualizações futuras)
      - **Controle de Estoque:** Implementação de funcionalidades para gerenciar o estoque de materiais e produtos utilizados na marcenaria. (Atualizações futuras)

# Contexto
<p>A aplicação é projetada para atender às necessidades da equipe administrativa da empresa de marcenaria. Ela oferece funcionalidades específicas para diversas áreas de gestão, incluindo Gerenciamento Financeiro, Controle de Estoque, Cadastro de Usuários, Clientes/Fornecedores e Gestão de Projetos.

Este sistema é disponibilizado como um Software como Serviço (SaaS), permitindo acesso remoto e flexibilidade para os usuários. O sistema apresenta um design intuitivo e amigável, levando em consideração diferentes níveis de conhecimento dos usuários. A implementação do ERP pode ser feita de forma gradual, permitindo que a empresa se ajuste à nova tecnologia à medida que os módulos são implementados, evitando interrupções nas operações diárias.</p>

# Documentação
<h3>Diagrama Entidade Relacional</h3>

![](https://github.com/xandegrawe/LeGraTech/blob/main/entidade%20relacional.png)

---
<h3>Diagrama de Caso de Uso</h3>

![](https://github.com/xandegrawe/LeGraTech/blob/main/casosdeuso.png)

<h3>Requisitos Funcionais</h3>

**RF001** - O sistema deve permitir o cadastro de informações detalhadas sobre clientes, incluindo nome, endereço, contato e informações de contato.

**RF002** - Deve ser possível registrar informações específicas dos fornecedores, como nome da empresa, tipo de fornecimento e detalhes de contato.

**RF003** -  Deve ser possível adicionar notas ou anotações relacionadas a clientes e fornecedores para referência futura.

**RF004** - Deve ser possível vincular transações financeiras (pagamentos, compras etc.) aos registros de clientes e fornecedores.

**RF005** -  O sistema deve permitir o registro de transações financeiras, incluindo receitas e despesas.

**RF006** - Deve ser possível categorizar as transações por tipo (ex.: venda, pagamento, compra) e atribuir valores monetários.

**RF007** - O software deve calcular automaticamente totais de transações e manter um saldo atualizado.

**RF008 -** Deve ser possível gerar relatórios financeiros detalhados, incluindo balanços, demonstrativos de resultados e fluxos de caixa.

**RF009** - Deve ser possível configurar alertas para pagamentos pendentes e vencimentos

**RF010** - O sistema exige que os usuários façam login com credenciais válidas para acessar suas funcionalidades, garantindo a segurança dos dados


<h3>Requisitos Não Funcionais</h3>

**RNF001** - A interface do usuário deve ser intuitiva e de fácil navegação.

**RNF002** - ****O sistema deve ser compatível com diferentes dispositivos e navegadores**.**

**RNF003** - ****O software deve garantir a segurança dos dados pessoais e financeiros**.**

**RNF004** - O tempo de resposta das consultas e geração de relatórios deve ser rápido.

**RNF005** - O sistema deve ser escalável para acomodar um aumento no número de registros e transações.

**RNF006** - O software deve oferecer uma interface para visualizar, editar e atualizar os registros de clientes e fornecedores.

---

<h2>C4 Model</h2>

![](https://github.com/xandegrawe/LeGraTech/blob/main/c4model01.png)
![](https://github.com/xandegrawe/LeGraTech/blob/main/c4model02.png)

---

<h3>Diagrama de Arquiterura de Software</h3>


![](https://github.com/xandegrawe/LeGraTech/blob/main/mvc.png)

<p>MVC com padrão repository</p>

---

# Stack
<h3>Backend</h3>

  - Ruby on Rails 7

<h3>Frontend</h3>
  
  - React JS
    
<h3>Banco de Dados</h3>

  - Postgresql

<h3>Servidor</h3>

  - Puma

<h3>Infraestrutura</h3>

- CI/CD do GitHub Actions

# Acompanhe o projeto
[Kanban / Projeto](https://github.com/users/xandegrawe/projects/1/views/1)
