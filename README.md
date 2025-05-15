# NodeCosmos

Nodecosmos is a collaborative product development platform that allows teams to structure projects,
model how things work step-by-step, and drive evolution through peer-reviewed proposals—all in one place.

### Directory & File structure: 
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
