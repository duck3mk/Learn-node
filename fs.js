const fs = require('fs')

// read file

// fs.readFile('./docs/blog1.txt', (err, data) => {
//   if (err) {
//     console.log(err)
//   };
//   console.log(data.toString())
// })

// console.log('hello')



// create and wartten files

fs.writeFile('./docs/blog1.txt', 'hello krar', () => {
  console.log('text was changed')
})


// create
fs.writeFile('./docs/blog2.txt', 'hello again', () => {
  console.log('text was changed')
})


