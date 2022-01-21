# base-template

## 1. Project setup

```
npm install
```

## 2. Iniciando com Modules

Dentro do diretório `src` podemos encontrar a pasta `modules` é dentro dela que ficam encapsulados os módulos do nosso sistema

Dentro de cada pasta encontrada em `modules` temos obrigatóriamente que criar a seguinte estrutura de pastas:

- `routes`
  - A pasta `route` por sua vez, contem o arquivo `index.js` que deve exportar um `array` de `objetos` contendo as informações das rotas deste módulo.
  ```javascript
  export default [
    {
      path: "/example",
      name: "example",
      component: () => import("../example/Example.vue"),
    },
  ];
  ```
- `index.js`

  - O arquivo `index.js` é responsável por realizar a configuração do módulo. Até o momento deve apenas exportar as rotas do módulo que foram capturadas a partir do arquivo em `./routes/index.js`

  ```javascript
  import routes from "./routes";

  export default {
    routes,
  };
  ```

  Idealmente cada módulo deverá conter a seguinte estrutura de pastas:

```javascript
├── src
│   ├── modules
│   │   ├── example
│   │   │   ├── routes (obrigatório)
│   │   │   │   ├── index.js
│   │   │   ├── views
│   │   │   │   ├── Example.vue
│   │   │   ├── components
│   │   │   │   ├── ExampleComponent.vue
│   │   │   ├── repositories
│   │   │   │   ├── exampleRepository.js
│   │   │   ├── services
│   │   │   │   ├── exampleService.js
│   │   │   ├── assets
│   │   │   │   ├── assetExample.jpg
│   │   │   ├── index.js (obrigatório)
│   │   ├── index.js (obrigatório)
```

### 2.1 Como é feita configuração dos módulos?

Dentro do `index.js` do diretório `modules` é onde realizamos a configuração de cada módulo a fim de centralizar as rotas e outros dados de todos os módulos em um unico local, em seguida será mostrado como é realizada essa configuração

```javascript
/*A função require.context() irá pegar todos os arquivos index.js de cada módulo*/
const requireModules = require.context("@/modules", true, /^.\/\w+\/index\.js/);

const routes = [];
const store = [];

/* A partir de cada arquivo encontrado é realizado um loop para capturar os objetos contendo as rotas de cada módulo e enviar para dentro do array routes*/
requireModules.keys().forEach((modulePath) => {
  let module = requireModules(modulePath).default;
  routes.push(...module.routes);
});
export { routes, store };
```

## 3. Entendendo o diretório Bootstrap

### 3.1 O que é o Bootstrap da aplicação?

- O `index.js` localizado neste diretório é responsável por chamar todas as funções que irão configurar a aplicação antes do seu inicio

### 3.2 Onde é utilizado?

- O Bootstrap é utilizado no nosso arquivo `main.js`, servindo para encapsular as funções que seriam chamadas direto no arquivo `main.js`

### 3.3 Utilizando o Bootstrap

```javascript
/*Deve-se importar os arquivos a ser executado, idealmente conforme o exemplo abaixo para que o arquivo já seja executado junto com a importação*/
import "@/@core/components";
```

## 4. Components globais

- Os components globais ficam localizados no diretório `src/@core/components`
- Dentro da pasta acima temos um arquivo `index.js` responsável por fazer o registro dos componentes globais. Pode-se criar sub-pastas para armazenar seus components pois o script de registro global atual de forma recursiva.
- Os components globais devem conter o prefixo `Acs` e nome deles devem estar em padrão PascalCase. Por exemplo: `AcsTextButton.vue`

```javascript
import Vue from "vue";

/*Este trecho de código faz a leitura de todos os arquivos cujo o nome comece com Acs e termine com .vue no diretório components e suas subpastas*/
const requireComponent = require.context(
  "@/@core/components",
  true,
  /Acs\w*\.(vue)$/
);

/*Para cada arquivo encontrado com as condições acima será realizado um loop que registrará o nome do component e o arquivo do component em questão*/
requireComponent.keys().forEach((filePath) => {
  const componentConfig = requireComponent(filePath);
  const componentName = filePath.split("/").pop().replace(/\.vue/, "");

  Vue.component(componentName, componentConfig.default || componentConfig);
});
```

## 5. Plugins

### 5.1 Vue Router

- Conforme haviamos falado no tópico 2.1, após exportarmos todas as rotas dos módulos da nossa aplicação, registramos elas no Vue Router

```javascript
import Vue from "vue";
import VueRouter from "vue-router";
/*No import abaixo recebemos as rotas de todos os módulos em unico array*/
import { routes } from "@/modules";
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
```
