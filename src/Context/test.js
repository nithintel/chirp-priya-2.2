// const convertArrayToObject = (array) => {
//   const initialValue = {}
//   return array.reduce((obj, item) => {
//     return {
//       ...obj,
//       ...item,
//     }
//   }, initialValue)
// }
// let res = convertArrayToObject([
//   { id: 111, name: 'John', age: 29 },
//   { id: 121, name: 'John', age: 29 },
// ])
//   console.log(res)

// export const generateArrayOfYears = () => {
//   var max = new Date().getFullYear()
//   var min = max - 17
//   var years = []

//   for (var i = max; i >= min; i--) {
//     years.push(i)
//   }
//   return years
// }

// console.log(generateArrayOfYears())

var array = [
  { caste: 'Banda', id: 4 },
  { caste: 'Bestha', id: 6 },
]

let recordS = array.map((el) => el.id)
console.log(recordS)
const arrayOfObject = [{ id: 1, name: 'john' }, {id: 2, name: 'max'}];

const checkUsername = obj => obj.id === 'max';

console.log(arrayOfObject.some(checkUsername))