// Closure

function a() {
  let a1 = 1;
  function b() {
    let b1 = 2;
    function c() {
      return b1 + a1;
    }
    return c();
  }
  return b();
}

console.log(a());

// // Prototype

// function Brick(w, h, d) {
//   this.width = w;
//   this.height = h;
//   this.depth = d;
//   // closure defined in constructor, can access private vars
//   // in outer scope
//   this.volume = function() {
//     function dx() {
//       return d;
//     }
//     return w * h * dx();
//   };
// }

// Brick.hr = function() {
//   return 'cigla';
// };

// let brick = new Brick(10, 5, 2);

// // defined at any type, can be changed after definition
// // has public scope
// Brick.prototype.area = function() {
//   return this.width * this.height;
// };

// console.log(brick);
// console.log(brick.area());
// console.log(brick.volume());
// console.log(Brick.hr()); // you can't brick.hr()
