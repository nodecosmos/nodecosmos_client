# Nodecosmos

### Directory & File structure: 
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
*  **pages** - Each route has associated page. Nested routes are handled with reactrouter `<Outlet />`

### GIT Workflow Recommendations:

1) Create a new branch for each modification.
2) Make changes to the code on your local branch, and commit changes regularly with clear and descriptive commit messages.
   * Commit-format: action#feature: short description
   * Common actions:
     * **feat**: a new feature or functionality
     * **update**: functionality
     * **fix**: a bug fix
     * **refactor**: a code refactoring or restructuring
     * **docs**: changes to documentation
     * **maint**: maintenance or other non-code changes
     * **test**: changes to testing code or configuration
     * **perf**: performance improvements
     * **revert**: a commit that reverts a previous change
     * **merge**: a commit that merges one branch into another
     * **build**: changes to the build system or configuration
     * **ci**: changes to the continuous integration (CI) pipeline or configuration
     * **deploy**: changes to the deployment process or configuration
     * **security**: security-related changes or fixes
3) Once you're ready to merge your changes into the main codebase, create a pull request and have your changes reviewed by other members of your team.
4) Make sure to pull changes from the main branch regularly to stay up to date with the latest changes.
5) Once your pull request has been approved, merge your changes into the main codebase.
6) Finally, delete your branch to keep your repository clean and organized.

### Run From Docker
```shell
  docker build --target dev -t nodecosmos_client . 
```
```shell
docker run --rm -it -p 3001:3001 -v "$(pwd)":/app nodecosmos_client
```
