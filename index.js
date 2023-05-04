const { readFileSync } = require('fs')
const RFRegression = require('ml-random-forest').RandomForestRegression
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs'); 
const { parse } = require('csv-parse')

const args = process.argv.slice(2)
const inputFilePath = args[0]
const outputFilePath = args[2]

function readCSVFile() {
  return new Promise((resolve) => {
    const result = [];
    fs.createReadStream(inputFilePath)
      .pipe(parse({columns: true, bom: true, skip_empty_lines: true}))
      .on('data', (data) => {
        result.push(data);
      })
      .on('end', () => {
        resolve(result)
      })
  })
}

function getData() {
  return new Promise((resolve) => {
    readCSVFile().then((value) => {
      const data = value.map(item => {
        return [
          item["Time"],
          item["PDJAI_CAL12"],
          item["PDJAI_CAL11"],
          item["PDJAI_CAL10"],
          item["PDJAI_CAL7"],
          item["PDJAI_CAL8"],
          item["PDJAI_CAL9"],
          item["GXCAI_CAL35"],
          item["GXCAI_CAL46"],
          item["GXCAI_CAL37"],
          item["GXCAI_CAL33"],
          item["GXCAI_CAL45"],
        ]
      })
      resolve(data)
    })
  })
}


;(async function () {

  const result = await getData()
  const regression5 = RFRegression.load(JSON.parse(readFileSync('./model/model5.json', 'utf8')))
  const regression6 = RFRegression.load(JSON.parse(readFileSync('./model/model6.json', 'utf8')))
  const regression7 = RFRegression.load(JSON.parse(readFileSync('./model/model7.json', 'utf8')))

  const input = result.map((item) => {
    return item.slice(1).map(Number)
  })

  const result5 = regression5.predict(input);
  const result6 = regression6.predict(input);
  const result7 = regression7.predict(input);

  const csvWriter = createCsvWriter({
    path: outputFilePath,
    header: [
        {id: 't', title: ''},
        {id: '[JYJ]AI_CAL[5]', title: '0'},
        {id: '[JYJ]AI_CAL[6]', title: '1'},
        {id: '[JYJ]AI_CAL[7]', title: '2'}
    ]
  });

  const records = result.map((item, index) => {
    return {
      "t": 0,
      "[JYJ]AI_CAL[5]": result5[index],
      "[JYJ]AI_CAL[6]": result6[index],
      "[JYJ]AI_CAL[7]": result7[index],
    }
  })
  csvWriter.writeRecords(records)  
  .then(() => {
      console.log('Done');
  });

})();




 

 
