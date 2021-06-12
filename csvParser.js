const csv = require('csv-parser')
const fs = require('fs')
const results = []

fs.createReadStream('csv/form.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    let dataArr = {}
    results.forEach((item) => {
      let newItem = item
      let typeKey = Object.keys(item)[0]
      let typeValue = item[typeKey]
      delete newItem[typeKey]
      let arr = []
      for (const key in newItem) {
        arr.push({ month: key, cost: newItem[key] })
      }
      dataArr[typeValue] = arr

      // if (typeKey) {
      //   fs.writeFile(
      //     `csvData/${typeValue}.json`,
      //     JSON.stringify(newItem, null, '\t'),
      //     () => {}
      //   )
      // }
    })

    fs.writeFile(
      `csvData/csvData.json`,
      JSON.stringify(dataArr, null, ' '),
      () => {}
    )
  })
