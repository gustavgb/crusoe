# crusoe

Generate small islands with perlin noise!

Take a look at the [live demo](https://gustavgb.github.io/crusoe/demo/).

## Usage

`npm install crusoe | yarn install crusoe`

With node:

```javascript
var crusoe = require('crusoe')

// Generate the island data
var map = crusoe.generateMap()

// Render island with default colors
var colors = crusoe.renderMap(map)
```

Use in browser by copying */lib/index.js*, then:

```javascript
var crusoe = window.crusoe

// Generate the island data
var map = crusoe.generateMap()

// Render island with default colors
var colors = crusoe.renderMap(map)
```

## Documentation

**crusoe** exports to functions:

### generateMap

Use this function to generate a random island according to specified options. Syntax: `crusoe.generateMap([options])`.

Returns:

```
{
  width: integer,
  height: integer,
  data: 2D-array
}
```

Island data can be accessed by using the syntax: `map.data[x][y]`.

#### Options:

* **width**: Width of the image data. Default: 100.
* **height**: Height of the image data. Default: 100.
* **noiseReduction**: Amount of noise reduction to be applied. Default: 10.
* **seed**: Custom seed. Default: 0.
* **size**: Size of the island. Default 1.
* **elevation**: Island elevation above sea level. Default 3.
* **lakeSize**: Size of lakes on island. Default 3.
* **curve**: Island curve. Default: 1.

### renderMap

Use this function to apply colors to the generated island. Optionally supply custom colors. Syntax: `crusoe.renderMap(map[, colors])`.

Returns:

```
{
  width: integer,
  height: integer,
  colors: 2D-array
}
```

Island colors can be accessed by using the syntax: `rendered.colors[x][y]`.

## Acknowledgements

Thanks to [noisejs](https://github.com/josephg/noisejs) for sharing a great perlin noise library.
