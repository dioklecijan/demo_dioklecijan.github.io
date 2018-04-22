function Brick(w, h, d) {
  this.width = w;
  this.height = h;
  this.depth = d;
}

Brick.prototype.volume = function() {
  return this.width * this.height * this.depth;
};

// allocation
let size = process.argv[2] || 0;
for (let index = 0; index < size; index++) {
  new Brick(index, index, index).volume();
}

// mem usage
const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
