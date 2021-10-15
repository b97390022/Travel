// // base class
// function HomeAppliance(type, power) {
//   this.type = type;
//   this.power = power;
// }

// HomeAppliance.prototype.useElectricity = function () {
//   console.log(`每小時耗電 ${this.power / 1000 * 1} 度。`)
// }

// // fridge class
// function Refrigerator(name, brand, power) {
//   HomeAppliance.call(this, '冰箱', power); // call super constructor.
//   this.name = name;
//   this.brand = brand;
// }

// // TV class
// function Television(name, brand, power) {
//   HomeAppliance.call(this, '電視', power); // call super constructor.
//   this.name = name;
//   this.brand = brand;
// }

// // 繼承 HomeAppliance
// Refrigerator.prototype = Object.create(HomeAppliance.prototype);
// Television.prototype = Object.create(HomeAppliance.prototype);

// // 加上function
// Refrigerator.prototype.fridge = function () {
//   console.log(`我的冰箱名字是: ${this.name}, 廠牌是: ${this.brand}, 正在進行冷藏`);
// }

// // 加上function
// Television.prototype.watch = function () {
//   console.log(`我的電視名字是: ${this.name}, 廠牌是: ${this.brand}, 正在進行看電視`);
// }

// // Refrigerator.prototype.constructor = Refrigerator;
// // Television.prototype.constructor = Television;

// var myFridge = new Refrigerator('我的冰箱', 'panasonic', 850);
// var myTV = new Television('我的電視', 'sony', 500);

// console.log(myFridge, myTV);

// myFridge.useElectricity();
// myFridge.fridge();

// myTV.useElectricity();
// myTV.watch();


//改寫成class
// class HomeAppliance {
  
//   constructor (type, power) {
//     this.type = type;
//     this.power = power;
//   }
  
//   useElectricity () {
//     console.log(`每小時耗電 ${this.power / 1000 * 1} 度。`);
//   }
  
// }

// // fridge class
// class Refrigerator extends HomeAppliance {
  
//   constructor (name, brand, power) {
//     super('冰箱', power);
//     this.name = name;
//     this.brand = brand;
//   }
  
//   fridge () {
//     console.log(`我的冰箱名字是: ${this.name}, 廠牌是: ${this.brand}, 正在進行冷藏`);
//   }
  
// }

// // TV class
// class Television extends HomeAppliance {
  
//   constructor (name, brand, power) {
//     super('電視', power);
//     this.name = name;
//     this.brand = brand;
//   }
  
//   watch () {
//     console.log(`我的電視名字是: ${this.name}, 廠牌是: ${this.brand}, 正在進行看電視`);
//   }
  
// }

// let myFridge = new Refrigerator('我的冰箱', 'panasonic', 850);
// let myTV = new Television('我的電視', 'sony', 500);
// //
// console.log(myFridge, myTV);

// myFridge.useElectricity();
// myFridge.fridge();

// myTV.useElectricity();
// myTV.watch();
const person = {
  name: '小明',
  cash: 1000,
};

// const sentence = `我是${person.name}，身上帶有 ${ ((c) => c * 2) (person.cash) } 元。`
const sentence = `我是${person.name}，身上帶有 ${ `身上帶有 ${person.cash}` } 元。`
console.log(sentence);