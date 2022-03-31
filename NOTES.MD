Hooks
-

* #### For componentDidMount
    ```javascript
        useEffect(() => {
        // Your code here
        }, []);
    ```



* #### For componentDidUpdate
  
    ```javascript
      useEffect(() => {
        // Your code here
      }, [yourDependency]);
    ```

* ###For componentWillUnmount
     
    ```javascript
         useEffect(() => {
           // componentWillUnmount
           return () => {
              // Your code here
           }
         }, [yourDependency]);
    ```



SVG
-
 * M - initial point (x, y)
 * H - move horizontally
 * V - move vertically
 * C - bezier curve `C 20 60, 20 60, 30 60`
 * L - line (x, y)
 
 #### Samples
  * 
    ```html
    <path
      strokeWidth={4}
      d="M 20 20 L 20 40 C 20 60, 20 60, 30 60 L 60 60"
      stroke="#e91e63"
      fill="transparent"
    />
    ```

TREE
-
* render micron
* render micron's children
* if we have micron **A** with children microns **B**, **C** & **D**
    * if nested micron **C** expanded -> 
        * increase parent micron **A** vertex
        * change **A**'s children **D** yStartPoint for **C** yLength
            * we don't change **B**'yStartPoint because it's above **C**]
        * we pass this nested call to parentChain
