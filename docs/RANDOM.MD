### Throwing random stuff here that can be useful

###  SVG:

* M - initial point (x, y)
* H - move horizontally
* V - move vertically
* C - bezier curve `C 20 60, 20 60, 30 60`
* L - line (x, y)

```html
    <path
      strokeWidth={4}
      d="M 20 20 L 20 40 C 20 60, 20 60, 30 60 L 60 60"
      stroke="#e91e63"
      fill="transparent"
    />
   ```
---
### TREE:

##### Consider following structure:

              A
              .
              . . . B
              .
              . . . C
              .
              . . . D
                    .
                    . D-1
                    .
                    . D-2


* **A** is `parent` of **B** **C** **D**
* **B** is `upperSibling` **C**
* **C** is `upperSibling` of **D**
---
### Streams:

client-side:
```javascript
const source = new EventSource('/my_controller/my_action');
source.onmessage = function(event) {
  const data = JSON.parse(event.data);
  // do something with the data
};
```

server-side:

```ruby
class MyController < ApplicationController
  include ActionController::Live

  def my_action
    response.headers['Content-Type'] = 'text/event-stream'
    response.headers['Cache-Control'] = 'no-cache'

    collection.aggregate(pipeline) do |result|
      response.stream.write "data: #{result.to_json}\n\n"
    end
  ensure
    response.stream.close
  end
end
```
