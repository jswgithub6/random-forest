const RFRegression = require('ml-random-forest').RandomForestRegression
const createCsvWriter = require('csv-writer').createObjectCsvWriter
const { readFileSync } = require('fs')
const { getData } = require('./data');

;(async function () {
  const rawData = await getData('./data/data_Test.csv')
  const input = rawData.map((item) => {
    return item.slice(1, 15).map(Number)
  })

  const regression5 = RFRegression.load(JSON.parse(readFileSync('./model5.json', 'utf8')))
  const regression6 = RFRegression.load(JSON.parse(readFileSync('./model6.json', 'utf8')))
  const regression7 = RFRegression.load(JSON.parse(readFileSync('./model7.json', 'utf8')))

  const result5 = regression5.predict(input)
  const result6 = regression6.predict(input)
  const result7 = regression7.predict(input)

  const csvWriter = createCsvWriter({
    path: './output.csv',
    header: [
      {id: 'TIME', title: 'TIME'},
      {id: '[JYJ]AI_CAL[5]', title: 'JYJAI_CAL5'},
      {id: '[JYJ]AI_CAL[6]', title: 'JYJAI_CAL6'},
      {id: '[JYJ]AI_CAL[7]', title: 'JYJAI_CAL7'}
    ]
  });

  const records = rawData.map((item, index) => {
    return {
      "TIME": item["TIME"],
      "[JYJ]AI_CAL[5]": result5[index],
      "[JYJ]AI_CAL[6]": result6[index],
      "[JYJ]AI_CAL[7]": result7[index],
    }
  })

  csvWriter.writeRecords(records)
  .then(() => {
      console.log('...Done');
  });

})();




 

 
