const canvas = document.getElementById('can')
canvas.width = 800
canvas.height = 600

const ctx = canvas.getContext('2d')

window.noise.seed(Math.floor(Date.now() / 100))

const width = canvas.width
const height = canvas.height
const widthHalf = width / 2
const heightHalf = height / 2
const gridSize = 5
const scale = 100

function getColor (climateFactor) {
  if (climateFactor > 0.9) {
    return '#ccc15f'
  } else if (climateFactor > 0.8) {
    return '#bcb954'
  } else if (climateFactor > 0.7) {
    return '#a5a850'
  } else if (climateFactor > 0.5) {
    return '#92a54f'
  } else if (climateFactor > 0.2) {
    return '#86a049'
  }
}

for (let x = 0; x < width; x += gridSize) {
  for (let y = 0; y < height; y += gridSize) {
    const islandFactor = (Math.cos((x - widthHalf) / widthHalf * Math.PI) + Math.cos((y - heightHalf) / heightHalf * Math.PI) - 0.5) * 2
    const terrainFactor = (window.noise.simplex2(x / scale, y / scale) + window.noise.perlin2(x / scale * 2, y / scale * 2))
    const pondFactor = islandFactor > 0 ? window.noise.perlin2(x / scale / 2, y / scale / 2) * 3 * islandFactor : 0

    const n = (islandFactor + terrainFactor + pondFactor) / 3

    if (n < 0) {
      // Ocean
      ctx.fillStyle = '#00f'
    } else {
      // Land
      const climateFactor = ((window.noise.simplex2(x / scale, y / scale) + window.noise.perlin2(x / scale * 2, y / scale * 2)) / 2 + 1) / 2 + islandFactor / 50

      ctx.fillStyle = getColor(climateFactor)
    }

    ctx.fillRect(x, y, gridSize, gridSize)
  }
}
