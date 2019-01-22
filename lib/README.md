# islandboss

Generate small islands randomly.

Take a look at the [live demo](https://gustavgb.github.io/noise-map-generator/).

## Usage

`npm install islandboss | yarn install islandboss`

Use as a node module:

```
var island = require('islandboss')

var map = island.generateMap(options)

var colors = island.renderMap(map)
```
