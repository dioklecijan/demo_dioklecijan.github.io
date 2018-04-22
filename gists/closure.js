function Brick(w, h, d) {
  // closure in constructor
  this.volume = function() {
    return w * h * d;
  };
}

// allocation
let size = process.argv[2] || 0;
for (let index = 0; index < size; index++) {
  new Brick(index, index, index).volume();
}

// mem usage
const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
