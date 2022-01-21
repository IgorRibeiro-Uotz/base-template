# base-template

## Project setup

```
npm install
```

## Iniciando com Modules

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

### Como é feita configuração dos módulos?

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
