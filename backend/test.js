const user = {
  name: 'An',
  age: '40',
}
const req = {
  name: 'Josephine',
  age: '30',
  value: ['something', 'another'],
}
console.log('User before:', user)

const update = Object.keys(req)
console.log(update)

update.forEach((key) => (user[key] = req[key]))

console.log('user after', user)
