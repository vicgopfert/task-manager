# Task Manager

Um organizador de tarefas diárias construído com React 19, Vite e Tailwind CSS 4.

O app organiza tarefas por período do dia (manhã, tarde e noite), acompanha o progresso de cada uma através de três estados e ainda registra o consumo diário de água, tudo sincronizado com uma API REST através do TanStack Query.

**Demo:** https://task-manager-red-two-77.vercel.app

---

## Funcionalidades

- **Dashboard** com contadores de tarefas totais, em andamento e concluídas, além do percentual da meta de água
- **CRUD completo de tarefas** — criar, editar, excluir e limpar todas de uma vez
- **Ciclo de status em um clique** — `não iniciada → em andamento → concluída → não iniciada`
- **Agrupamento por período** — a página "Minhas Tarefas" separa as tarefas em manhã, tarde e noite
- **Controle de hidratação** — marcação incremental de 500 ml até a meta de 2,5 L
- **Validação de formulários** com mensagens de erro por campo e estados de carregamento em todos os botões
- **Feedback visual** via toasts para cada operação (sucesso e erro)
- **Modais animados** renderizados em portal, com transição de entrada e saída

---

## Stack

| Camada | Tecnologia |
| --- | --- |
| UI | React 19 · React Router 7 |
| Estilo | Tailwind CSS 4 · tailwind-variants · Poppins |
| Estado do servidor | TanStack Query 5 · Axios |
| Formulários | React Hook Form |
| UX | Sonner (toasts) · React Transition Group |
| Build | Vite 8 · vite-plugin-svgr |
| Qualidade | ESLint · Prettier · Husky · lint-staged · Commitlint |
| API (dev) | json-server |

---

## Estrutura

```
src/
├── assets/          fontes e ícones SVG (importados como componentes React)
├── components/      componentes de UI reutilizáveis
├── hooks/data/      hooks de acesso a dados (queries e mutations)
├── keys/            query keys e mutation keys centralizadas
├── lib/axios.js     instância do Axios com baseURL vinda do .env
├── pages/           Home, Tasks e TaskDetails
└── index.css        tema do Tailwind (cores, fontes) e @font-face
```

---

## Decisões técnicas

### Camada de dados isolada em hooks

Nenhum componente chama a API diretamente. Cada operação vive em um hook próprio em [src/hooks/data/](src/hooks/data/) — `useGetTasks`, `useAddTask`, `useUpdateTask`, `useDeleteTask`, `useClearTasks`, `useGetWater`, `useUpdateWater`. Os componentes só consomem `data`, `mutate` e `isPending`, o que mantém a UI declarativa e a lógica de rede testável e reaproveitável.

### Cache atualizado manualmente, sem refetch

Em vez de invalidar as queries e disparar uma nova requisição a cada mutação, o cache é atualizado no `onSuccess` com `setQueryData`. Um exemplo em [use-update-task.js](src/hooks/data/use-update-task.js): ao editar uma tarefa, tanto a lista (`["tasks"]`) quanto o detalhe (`["task", id]`) são sincronizados na mesma operação. O resultado é uma interface que responde instantaneamente e faz menos chamadas de rede.

### Query keys centralizadas

As chaves de cache ficam em [src/keys/](src/keys/) como funções (`taskQueryKeys.getById(id)`), evitando strings soltas espalhadas pelo código e garantindo que query e mutation apontem sempre para a mesma entrada do cache.

### Variantes de estilo com tailwind-variants

Componentes como [Button.jsx](src/components/Button.jsx), [TaskItem.jsx](src/components/TaskItem.jsx) e [WaterItem.jsx](src/components/WaterItem.jsx) usam `tv()` para mapear props em classes, no lugar de concatenar strings condicionalmente. Um botão é `<Button color="primary" size="large" />`; um item de tarefa muda cor de fundo, cor de texto e ícone só em função do `status`.

### Status como dado, não como condicional

O ciclo de status da tarefa é descrito por três mapas — `STATUS_ICON`, `STATUS_CYCLE` e `STATUS_TOAST` — em vez de encadeamentos de `if`. Adicionar um novo estado significa adicionar uma entrada em cada mapa, sem tocar na lógica de renderização.

### Modais em portal com animação

`AddTaskDialog` e `ClearTasksDialog` usam `createPortal` para escapar da árvore de layout e `CSSTransition` com `unmountOnExit` para animar entrada e saída — o modal só existe no DOM enquanto está visível, e o formulário é resetado no `onExit`.

### Formulários controlados pelo React Hook Form

Validação declarativa por campo (obrigatoriedade e rejeição de espaços em branco), erros renderizados abaixo do input e inputs desabilitados durante o envio. Na página de detalhes, a prop `values` sincroniza o formulário com a tarefa assim que ela chega da API.

### Ícones como componentes

SVGs são importados via `vite-plugin-svgr` (`?react`) e reexportados de um [barrel file](src/assets/icons/index.js), o que permite estilizá-los com classes do Tailwind — como `className="animate-spin"` no loader e `currentColor` herdando a cor do contexto.

### Tema no CSS

As cores da marca são definidas uma única vez no bloco `@theme` do [index.css](src/index.css) e viram utilitários do Tailwind (`bg-primary`, `text-dark-blue`, `border-border`), mantendo a paleta consistente sem arquivo de configuração JS.

---

## Qualidade de código

O projeto é protegido por hooks de Git automatizados:

- **pre-commit** → `lint-staged` roda ESLint (`--max-warnings 0`) e Prettier apenas nos arquivos alterados
- **commit-msg** → `commitlint` exige Conventional Commits (`feat:`, `fix:`, `chore:`…)
- **ESLint** com regras de React Hooks, Fast Refresh e ordenação automática de imports (`simple-import-sort`)
- **Prettier** com `prettier-plugin-tailwindcss`, que ordena as classes do Tailwind — inclusive dentro das chamadas `tv()`
- **PropTypes** em todos os componentes que recebem props

---

## Como rodar

**Pré-requisitos:** Node.js 18+

```bash
git clone https://github.com/vicgopfert/task-manager.git
cd task-manager
npm install
```

Crie o arquivo `.env.development` na raiz:

```env
VITE_API_URL=http://localhost:3000
```

Em dois terminais separados:

```bash
npm run server   # json-server na porta 3000 (usa o db.json)
npm run dev      # Vite na porta 5173
```

Acesse `http://localhost:5173`.

### Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | servidor de desenvolvimento |
| `npm run server` | API fake com json-server |
| `npm run build` | build de produção |
| `npm run preview` | pré-visualiza o build |
| `npm run lint` | verifica o código com ESLint |
| `npm run format` | formata o projeto com Prettier |

---

## API

O `db.json` define dois recursos consumidos pelo app:

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/tasks` | lista todas as tarefas |
| `GET` | `/tasks/:id` | busca uma tarefa |
| `POST` | `/tasks` | cria uma tarefa |
| `PATCH` | `/tasks/:id` | atualiza campos ou status |
| `DELETE` | `/tasks/:id` | remove uma tarefa |
| `GET` | `/water` | consumo de água atual |
| `PATCH` | `/water` | atualiza o consumo |

Formato da tarefa:

```json
{
  "id": "uuid",
  "title": "Estudar",
  "description": "Estudar curso de React",
  "time": "morning | afternoon | evening",
  "status": "not_started | in_progress | done"
}
```

---

## Deploy

Hospedado na Vercel. O [vercel.json](vercel.json) reescreve todas as rotas para `/`, permitindo que o React Router assuma o roteamento no client e que URLs como `/task/:id` funcionem em acesso direto ou refresh. A URL da API de produção vem de `.env.production`.
