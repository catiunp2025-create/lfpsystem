# LFP System — Monorepo

Este repositório é um **monorepo** gerenciado com [TurboRepo](https://turbo.build) e [pnpm Workspaces](https://pnpm.io/workspaces).

---

## O que é um monorepo?

Um monorepo é um único repositório Git que contém múltiplos projetos (pacotes). No nosso caso:

```
lfpsystem/
├── backend/    → API NestJS
└── frontend/   → Aplicação web (em desenvolvimento)
```

Em vez de cada projeto ter seu próprio repositório, eles vivem juntos. Isso facilita compartilhar código, manter versões alinhadas e rodar tudo junto com um único comando.

---

## O que é o TurboRepo?

O TurboRepo é uma ferramenta que orquestra os scripts dos pacotes do monorepo de forma inteligente:

- **Cache:** Se nada mudou em um pacote, ele não roda o build de novo — usa o resultado em cache.
- **Paralelismo:** Roda os scripts de múltiplos pacotes ao mesmo tempo quando possível.
- **Dependências entre pacotes:** Se o `frontend` depende do `backend` estar buildado primeiro, o Turbo garante essa ordem automaticamente via `"dependsOn": ["^build"]`.

---

## Estrutura de arquivos importantes

| Arquivo | Função |
|---|---|
| `package.json` (raiz) | Scripts globais e dependências de desenvolvimento do monorepo |
| `pnpm-workspace.yaml` | Lista quais pastas são pacotes do monorepo |
| `turbo.json` | Define como o TurboRepo executa cada script |
| `backend/package.json` | Pacote do backend |
| `frontend/package.json` | Pacote do frontend |

---

## Comandos disponíveis

Rode sempre a partir da **raiz** do projeto (`lfpsystem/`):

```bash
# Rodar todos os pacotes em modo desenvolvimento
pnpm dev

# Buildar todos os pacotes
pnpm build

# Rodar lint em todos os pacotes
pnpm lint

# Rodar testes em todos os pacotes
pnpm test
```

Para rodar apenas um pacote específico:

```bash
# Só o backend
pnpm --filter @lfpsystem/backend dev

# Só o frontend
pnpm --filter @lfpsystem/frontend dev
```

---

## Como adicionar um novo pacote

Siga os passos abaixo para adicionar um novo pacote ao monorepo (ex: `frontend`, `mobile`, `shared`):

### 1. Crie a pasta do pacote na raiz

```bash
mkdir nome-do-pacote
```

### 2. Crie o `package.json` dentro da pasta

O nome deve seguir o padrão `@lfpsystem/nome-do-pacote`:

```json
{
  "name": "@lfpsystem/nome-do-pacote",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "dev": "comando para rodar em dev",
    "build": "comando para buildar",
    "lint": "comando para lint",
    "test": "comando para testar"
  }
}
```

### 3. Registre o pacote no `pnpm-workspace.yaml` (raiz)

Adicione o nome da pasta na lista de `packages`:

```yaml
packages:
  - 'backend'
  - 'frontend'
  - 'nome-do-pacote'   # ← adicione aqui
```

### 4. Instale as dependências

Na raiz do projeto:

```bash
pnpm install
```

O pnpm vai reconhecer o novo pacote automaticamente.

### 5. (Opcional) Ajuste o `turbo.json` se necessário

Se o novo pacote tiver scripts com nomes diferentes dos já configurados (`build`, `start:dev`, `lint`, `test`), adicione-os ao `turbo.json` na raiz.

---

## Dependência entre pacotes

Se um pacote precisar usar código de outro (ex: `frontend` importando tipos do `backend`), adicione como dependência:

```bash
pnpm --filter @lfpsystem/frontend add @lfpsystem/backend
```

E no código:

```ts
import { AlgumaCoisa } from '@lfpsystem/backend'
```

---

## Requisitos

- [Node.js](https://nodejs.org) >= 18
- [pnpm](https://pnpm.io) >= 9

```bash
# Instalar pnpm globalmente (caso não tenha)
npm install -g pnpm
```
