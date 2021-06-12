const csv = require('csv-parser')
const fs = require('fs')
const results = []

fs.createReadStream('csv/form.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log(results)

    results.forEach((item) => {
      if (item.loan_type) {
        fs.writeFileSync(`/csvData/${item.loan_type}.png`, 'test')
      }
    })
  })
