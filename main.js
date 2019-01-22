const canvas = document.getElementById('can')
canvas.width = 800
canvas.height = 600

const ctx = canvas.getContext('2d')

window.noise.seed(Math.floor(Date.now() / 100))

const width = canvas.width
const height = canvas.height
const islandW = width * 0.45
const islandH = height * 0.45
const gridSize = 5
const scale = 100

function getLandColor (climateFactor) {
  if (climateFactor > 0.9) {
    return '#ccc15f'
  } else if (climateFactor > 0.8) {
    return '#bcb954'
  } else if (climateFactor > 0.7) {
    return '#a5a850'
  } else if (climateFactor > 0.5) {
    return '#92a54f'
  } else {
    return '#86a049'
  }
}

function getOceanColor (depthFactor) {
  if (depthFactor > -0.1) {
    return '#4d68af'
  } else if (depthFactor > -0.15) {
    return '#3b559b'
  } else if (depthFactor > -0.2) {
    return '#293f77'
  } else if (depthFactor > -0.25) {
    return '#24386b'
  } else if (depthFactor > -0.3) {
    return '#233668'
  } else if (depthFactor > -0.35) {
    return '#213466'
  } else {
    return '#1d2e5b'
  }
}

for (let x = 0; x < width; x += gridSize) {
  for (let y = 0; y < height; y += gridSize) {
    let islandFactor = (Math.cos((x - canvas.width / 2) / islandW * Math.PI) + Math.cos((y - canvas.height / 2) / islandH * Math.PI) - 0.5) * 4.5
    // if (islandFactor < -0.4) islandFactor = -10
    const terrainFactor = (window.noise.simplex2(x / scale, y / scale) + window.noise.perlin2(x / scale * 2, y / scale * 2))
    const pondFactor = islandFactor > 0 ? window.noise.perlin2(x / scale / 2, y / scale / 2) * 3 * islandFactor : 0

    const n = (islandFactor + terrainFactor + pondFactor) / 3

    if (n < 0) {
      // Ocean
      ctx.fillStyle = getOceanColor(n)
    } else {
      // Land
      const climateFactor = ((window.noise.simplex2(x / scale, y / scale) + window.noise.perlin2(x / scale * 2, y / scale * 2)) / 2 + 1) / 2 + islandFactor / 50

      ctx.fillStyle = getLandColor(climateFactor)
    }

    ctx.fillRect(x, y, gridSize, gridSize)
  }
}
