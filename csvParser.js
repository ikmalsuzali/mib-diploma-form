const csv = require('csv-parser')
const fs = require('fs')
const results = []

fs.createReadStream('csv/form.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    results.forEach((item) => {
      let typeKey = Object.keys(item)[0]
      let typeValue = Object[typeKey]

      if (typeKey) {
        fs.writeFileSync(`${typeValue}.png`, 'test')
      }
    })
  })
