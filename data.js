const fs = require('fs'); 
const { parse } = require('csv-parse');

function readCSVFile(csvFilePath) {
  return new Promise((resolve) => {
    const result = [];
    fs.createReadStream(csvFilePath)
      .pipe(parse({ columns: true, bom: true, skip_empty_lines: true }))
      .on('data', (data) => {
        result.push(data)
      })
      .on('end', () => {
        resolve(result)
      })
  })
}

function getData(csvFilePath) {
  return new Promise((resolve) => {
    readCSVFile(csvFilePath).then((value) => {
      const data = value.map(item => {
        return [
          item["TIME"],
          item["[PDJ]AI_CAL[12]"],
          item["[PDJ]AI_CAL[11]"],
          item["[PDJ]AI_CAL[10]"],
          item["[PDJ]AI_CAL[7]"],
          item["[PDJ]AI_CAL[8]"],
          item["[PDJ]AI_CAL[9]"],
          item["[PDJ]AI_CAL[5]"],
          item["[GXC]AI_CAL[35]"],
          item["[GXC]AI_CAL[46]"],
          item["[GXC]AI_CAL[37]"],
          item["[GXC]AI_CAL[33]"],
          item["[GXC]AI_CAL[45]"],
          item["[GXC]AI_CAL[47]"],
          item["[GXC]AI_CAL[34]"],
          item["[JYJ]AI_CAL[5]"],
          item["[JYJ]AI_CAL[6]"],
          item["[JYJ]AI_CAL[7]"],
        ]
      })
      resolve(data)
    })
  })
}

module.exports = {
  getData
}