# Vitrine Geral

**Catálogo digital responsivo desenvolvido com React e TypeScript.**

O Vitrine Geral reúne produtos de diferentes categorias em uma interface de navegação simples, com pesquisa, filtros e uma lista de favoritos. O projeto surgiu de um trabalho interdisciplinar da faculdade e foi aprimorado para demonstrar a construção de interfaces, organização de código e integração com APIs externas.

**[Acessar aplicação na Vercel](https://interdisciplinar-final-sigma.vercel.app/)** · **[Ver código no GitHub](https://github.com/Juliasacht/Site-de-Produtos-Vitrine-Geral)**

## Funcionalidades

- **Catálogo de produtos:** consulta dados das APIs Fake Store e DummyJSON.
- **Busca:** pesquisa por nome, marca e categoria, sem diferenciar maiúsculas/minúsculas ou acentos.
- **Filtros dinâmicos:** apresenta as categorias disponíveis nos produtos carregados.
- **Ordenação:** ordem original, nome de A a Z, menor preço e maior preço.
- **Favoritos:** adiciona e remove produtos, mantendo a lista no armazenamento local do navegador.
- **Estados de interface:** mensagens de carregamento, ausência de resultados, imagem indisponível e falhas de conexão.
- **Layout responsivo:** navegação e cards adaptados para telas de tamanhos diferentes.

> **Observação:** este é um projeto demonstrativo de catálogo, não uma loja com compras ou pagamentos. As APIs fornecem preços em **USD (dólar americano)**. Não há conversão automática para reais.

## Tecnologias

| Tecnologia | Aplicação |
| --- | --- |
| **React** | Construção da interface e componentes |
| **TypeScript** | Tipagem das entidades e funções |
| **Vite** | Ambiente de desenvolvimento e build |
| **React Router** | Navegação entre Início, Produtos e Favoritos |
| **CSS e CSS Modules** | Estilos, responsividade e organização visual |
| **Fetch API** | Consumo assíncrono das APIs de produtos |
| **localStorage** | Persistência dos favoritos no navegador |
| **Node.js Test Runner** | Testes das funções de busca, filtro, ordenação e preço |

### APIs utilizadas

- [Fake Store API](https://fakestoreapi.com/) — produtos e categorias.
- [DummyJSON](https://dummyjson.com/) — produtos de múltiplas categorias.

Os dados são carregados de fontes externas, portanto a disponibilidade dos produtos e imagens pode variar. Quando apenas uma API responde, a aplicação mantém os resultados disponíveis e informa a indisponibilidade parcial.

## Estrutura do projeto

~~~text
src/
├── components/    # Cabeçalho, rodapé e cards de produtos
├── controllers/   # Lógica de gerenciamento de produtos e favoritos
├── interfaces/    # Contratos usados nas entidades
├── models/        # Modelos e entidades de domínio
├── pages/         # Início, Produtos e Favoritos
├── utils/         # Busca, categorias, ordenação e formatação
├── App.tsx        # Rotas da aplicação
└── main.tsx       # Entrada da aplicação
tests/
└── catalogo.test.mjs  # Testes das funções do catálogo
~~~

A estrutura mantém a separação entre interface, modelos de dados e operações do catálogo, retomando conceitos de programação orientada a objetos trabalhados no projeto acadêmico.

## Como executar localmente

**Pré-requisitos:** Node.js 18 ou superior e npm.

~~~bash
git clone https://github.com/Juliasacht/Site-de-Produtos-Vitrine-Geral.git
cd Site-de-Produtos-Vitrine-Geral
npm install
npm run dev
~~~

Abra no navegador o endereço informado pelo Vite (normalmente \`http://localhost:5173\`).

### Testes e build

~~~bash
npm test
npm run build
npm run preview
~~~

Os testes automatizados cobrem normalização de textos, busca, combinação de filtros, categorias dinâmicas, ordenação e indicação da moeda.

## Demonstração

**[Abrir Vitrine Geral](https://interdisciplinar-final-sigma.vercel.app/)**

Para conhecer o fluxo principal, acesse **Produtos**, teste uma busca e um filtro e marque um item como favorito. Depois, abra **Favoritos** para consultar sua lista.

## Contexto e evolução

O Vitrine Geral foi desenvolvido como trabalho interdisciplinar, com foco em React, TypeScript, consumo de APIs e conceitos de organização de software. Posteriormente, a interface recebeu uma nova identidade visual, responsividade e aprimoramentos na experiência de pesquisa e navegação.

**Desenvolvimento:** [Juliasacht](https://github.com/Juliasacht)

*Imagens da página inicial utilizadas de forma ilustrativa. Os produtos exibidos no catálogo vêm das APIs externas.*
