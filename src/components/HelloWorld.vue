<template>
  <div id="app">
    <h1>Pixel War</h1>
    <form @submit.prevent="submitPixel">
      <label for="x">X Coordinate (0-999):</label>
      <input type="number" id="x" v-model="x" min="0" max="999" required>
      <label for="y">Y Coordinate (0-699):</label>
      <input type="number" id="y" v-model="y" min="0" max="699" required>
      <div :style="{ backgroundColor: selectedColor }" class="color-preview"></div>
      <label for="color">Color (e.g., #FF5733):</label>
      <input type="text" id="color" v-model="color" required>
      <button type="submit">Change Color</button>
    </form>
    <canvas ref="pixelCanvas" width="1000" height="700" style="border: 1px solid black;"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      grid: [],
    };
  },
  mounted() {

    this.loadGridData();
    const socket = this.$socket;
    socket.on('updatePixel', (data) => {
      this.updatePixel(data.x, data.y, data.color);
    });
  },

  methods: {
    loadGridData() {
    },
    changeColor(x, y) {
      const color = 'rgb(255, 0, 0)'/* Get the selected color */;
      this.$socket.emit('changePixelColor', { x, y, color });
    },
    updatePixel(x, y, color) {
      const row = this.grid.find((r) => r[0].y === y);
      if (row) {
        const pixel = row.find((p) => p.x === x);
        if (pixel) {
          pixel.color = color;
        }
      }
    },
  },
};
</script>

<style>
.pixel-grid {
  display: flex;
  flex-direction: column;
}

.grid-row {
  display: flex;
}

.pixel {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>
