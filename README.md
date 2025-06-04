# NodeCosmos Client

NodeCosmos is a collaborative platform for product development and system design. It enables teams to structure
projects, model how things work step by step, and drive evolution through peer-reviewed proposals—all in one place.
Think GitHub for systems and innovation.

## 🔧 Key Features

* ### 🌳 Node Tree
  Structure your product as a tree of nodes. Each node can represent a system or its components, ingredients in a
  recipe,
  or any type of constituent depending on the nature of a project.

* ### 🔁 Flows

  Visually define how each node works from beginning to end, step by step by laying out interactions between
  nodes:  [Lightbulb Flow Sample](https://nodecosmos.com/nodes/0e71060b-000a-42c4-a29d-6afd204d79a1/0e71060b-000a-42c4-a29d-6afd204d79a1/workflow)

* ### 📝 Real-Time Documentation
  Document every Node, Flow, Step, and I/O inline with a real-time collaborative editor—no context-switching required.

* ### 💡 Contribution Requests
  Propose changes to any part of the system with a visual diff and threaded feedback—just like GitHub Pull Requests, but
  for structured systems and processes.

## Directory & File structure: 
*  **pages** - Each route has associated page. Nested routes are handled with react router's `<Outlet />`
*  **common** - everything that does not relate to redux state
   * **components** - common view components
   * **hooks** - common business logic
*  **features** - each feature corresponds to a model in the database with an exception to the app and home
   * **feature-name**
       *  **components** - view components
       *  **hooks** - domain specific logic
       *  **reducers** - (optional) state management for feature, usually used for large slices
          * **extra** - handle async actions usually defined within feature.thunks.js (createNode, updateNode, deleteNode...)
       *  **feature.thunks.js** - usually used for api calls but it can be used for async actions that require state changes from multiple reducers
       *  **feature.selectors.js** - used to select data from feature state
       *  **featureSlice.js** - state management for feature

### Run From Docker
```shell
docker build --target dev -t nodecosmos_client . 
```
```shell
docker run --rm -it -p 3001:3001 -v "$(pwd)":/app nodecosmos_client
```

###### .env files
```shell
VITE_API_BASE_URL: http://localhost:3000
VITE_REACT_APP_URL: http://localhost:3001
VITE_RECAPTCHA_ENABLED: false
VITE_RECAPTCHA_SITE_KEY: # optional
VITE_STRIPE_ENABLED: false
VITE_GOOGLE_CLIENT_ID: # optional: used for google login
```

Nodecosmos uses [Font Awesome](https://fontawesome.com/) for icons.
To use the Pro icons, you need to set up an authentication token in your `.npmrc` file.

.npmrc
```shell
@fortawesome:registry=https://npm.fontawesome.com/
//npm.fontawesome.com/:_authToken=${FONT_AWESOME_NPM_TOKEN}
```

