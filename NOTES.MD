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
##### Consider following structure:
        
              A
              .
              . . . B
              .
              . . . C
              .
              . . . D
       A - yEnds    .
                    . D-1
                    .
                    . D-2
          

* **A** is `parent` of **B** **C** **D**
* **B** is `upperSibling` **C**
* **C** is `upperSibling` of **D**
