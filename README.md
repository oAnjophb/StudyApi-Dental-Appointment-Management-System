<div align="center">

# 🦷 OdontoPlus API

### Sistema de Gestão Odontológica Inteligente e Seguro

<p>
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-20.x-339933?style=flat&logo=node.js" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript" />
  <img alt="Prisma" src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat&logo=prisma" />
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-15-4169E1?style=flat&logo=postgresql" />
  <img alt="Express" src="https://img.shields.io/badge/Express-4.x-000000?style=flat&logo=express" />
</p>

[Sobre](#-sobre-o-projeto) • [Funcionalidades](#-funcionalidades-chave) • [Instalação](#-pré-requisitos) • [Rotas](#-documentação-da-api)

</div>

---

## 📖 Sobre o Projeto

O **OdontoPlus** não é apenas um CRUD. É uma solução robusta desenvolvida para resolver os desafios reais de uma clínica odontológica: **conflitos de agenda, gestão de múltiplos profissionais e segurança de dados.**

O sistema foi construído sobre os pilares da **Clean Architecture** e princípios **SOLID**, garantindo que as Regras de Negócio (Services) estejam desacopladas da camada de HTTP (Controllers), facilitando manutenção e escalabilidade.

> **Status:** 🟢 Back-end Finalizado (v1.0) | 🟡 Front-end em Desenvolvimento

---

## 🚀 Funcionalidades Chave

<div align="center">
  <i>Clique nas setas para ver os detalhes técnicos de cada módulo</i>
</div>
<br>

<details>
  <summary><b>📅 Agendamento Inteligente (Core)</b></summary>
  <br>
  O coração do sistema. Implementa lógicas complexas para evitar erros humanos:
  <ul>
    <li><b>Detecção de Conflitos:</b> O sistema calcula matematicamente se há sobreposição de horários antes de confirmar qualquer agendamento.</li>
    <li><b>Validação de Jornada:</b> Verifica na tabela <code>Availability</code> se o dentista atende naquele dia da semana e horário específico.</li>
    <li><b>Bloqueios de Agenda (Locks):</b> O sistema barra agendamentos em períodos de férias ou atestados, configurados via <code>ScheduleLock</code>.</li>
    <li><b>Snapshot Financeiro:</b> Salva o preço acordado (<code>agreedPrice</code>) no momento da reserva, protegendo o histórico contra aumentos futuros na tabela de serviços.</li>
  </ul>
</details>

<details>
  <summary><b>🔐 Segurança e RBAC (Role-Based Access Control)</b></summary>
  <br>
  <ul>
    <li><b>Autenticação JWT:</b> Acesso via Token Bearer com expiração segura.</li>
    <li><b>Permissões Granulares:</b>
      <ul>
        <li><code>ADMIN</code>: Acesso irrestrito, gestão de funcionários e configurações globais.</li>
        <li><code>DENTIST</code>: Gestão da própria agenda, bloqueios e visualização de pacientes.</li>
        <li><code>RECEPTIONIST</code>: Gestão de pacientes, marcação e confirmação de agendamentos.</li>
      </ul>
    </li>
    <li><b>Auditoria:</b> Registros críticos salvam o ID de quem criou (<code>createdById</code>) e quem atualizou (<code>updatedById</code>).</li>
  </ul>
</details>

<details>
  <summary><b>🏥 Gestão de Clínica</b></summary>
  <br>
  <ul>
    <li><b>Pacientes:</b> Endereçamento estruturado e estratégia de <b>Soft Delete</b> (<code>deletedAt</code>) para integridade histórica.</li>
    <li><b>Dentistas:</b> Perfil profissional vinculado ao usuário de acesso, validando especialidades.</li>
    <li><b>Serviços:</b> Catálogo de procedimentos com duração (para cálculo automático de término) e preço.</li>
    <li><b>Ciclo de Vida:</b> Fluxo completo de status: <code>SCHEDULED</code> ➝ <code>CONFIRMED</code> ➝ <code>COMPLETED</code> / <code>CANCELLED</code> / <code>NO_SHOW</code>.</li>
  </ul>
</details>

---

## 📂 Estrutura do Monorepo

O projeto está organizado para escalar, mantendo Back-end e Front-end no mesmo repositório, mas isolados logicamente.

```
├── 📁 prisma           # Database Schemas & Migrations
├── 📁 src              # Backend Source Code (API)
│   ├── 📁 auth         # Autenticação & Tokenização
│   ├── 📁 controllers  # Camada de Entrada HTTP
│   ├── 📁 dtos         # Data Transfer Objects (Tipagem de entrada)
│   ├── 📁 middlewares  # Guards (Auth, Permissions, Validations)
│   ├── 📁 services     # Regras de Negócio Puras
│   └── 📄 server.ts    # Entry Point
├── 📁 ui               # Frontend React + Vite (Interface)
└── 📄 package.json     # Gerenciamento de Dependências
```

<br/>
<br/>

<div align="center">
  <h1>⚡ Como Rodar o Projeto Localmente</h1>
  <p><strong>Passo a passo completo para executar a API + Interface do OdontoPlus</strong></p>
</div>
<br/>
<br>

### 📋 Pré-requisitos

<div style="background:#f4f4f9;padding:15px;border-radius:8px;border-left:5px solid #4361ee">

- **Node.js** `v18` ou superior
- **Yarn** (recomendado) ou NPM
- **PostgreSQL** rodando localmente

</div>

<br>

### 🟢 Passo 1 – Configurando o Backend (API)

```bash
git clone https://github.com/seu-usuario/odontoplus.git
cd odontoplus

yarn | yarn install
```

##### Crie o arquivo `.env` na raiz do projeto

<div style="background:#2d3748;padding:18px;border-radius:10px;color:#e2e8f0;font-family:Consolas,Monaco,monospace;">
<pre style="margin:0;color:#a0e7a0;">
DATABASE_URL="postgresql://postgres:admin@localhost:5432/odontoplus?schema=public"
JWT_SECRET="segredo_super_secreto_odontoplus_2025"
PORT=3000
CORS_ORIGIN="http://localhost:5173"
</pre>
</div>

##### Execute as migrations do Prisma

```bash
npx prisma migrate dev --name nome-da-sua-migração
```

##### Inicie o Servidor

```bash
yarn dev | Npm run dev

O Backend estará rodando em: http://localhost:3000
```

<br/>

### 🔵 Passo 2: Configurando o Frontend (UI)

Abra um **novo terminal** para não parar o servidor.

##### Entre na pasta do frontend:

```bash
cd ui
```

##### Instale as dependências e rode

```bash
yarn & yarn dev

A aplicação web abrirá em: http://localhost:5173
```

## 📍 Documentação da API

<div style="background:#f4f4f9;padding:15px;border-radius:8px;border-left:5px solid #4361ee">

- Principais rotas disponíveis na versão v1.
</div>

<br/>

<div align="center">

| Recurso          | Método | Endpoint                    | Permissão     | Descrição                           |
| :--------------- | :----: | :-------------------------- | :------------ | :---------------------------------- |
| **Auth**         |   🟢   | `/auth/login`               | Público       | Login e obtenção de Token           |
| **Users**        |   🟢   | `/users`                    | Admin         | Criar novo usuário (Dentista/Recep) |
| **Dentists**     |   🟢   | `/dentists`                 | Admin         | Criar perfil profissional           |
| **Availability** |   🟢   | `/availabilities`           | Admin/Dentist | Definir jornada de trabalho         |
| **Locks**        |   🟢   | `/locks`                    | Admin/Dentist | Bloquear dias (Férias/Feriados)     |
| **Patient**      |   🟢   | `/patients`                 | Admin/Recep   | Cadastro completo de paciente       |
| **Appointment**  |   🟢   | `/appointments`             | Admin/Recep   | Agendar consulta (Com validações)   |
| **Appointment**  |   🔵   | `/appointments/patient/:id` | Todos         | Histórico clínico do paciente       |
| **Status**       |   🟠   | `/appointments/:id/status`  | Todos         | Mudar para Finalizado/Cancelado     |

</div>

<div align="center"> <sub>Desenvolvido com 💙 e TypeScript por <a href="https://github.com/oAnjophb">Ruan Anjos</a>. <br/>Obrigado por olhar meu simples projeto!</sub> </div>
