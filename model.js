const { readFileSync } = require('fs');
const RFRegression = require('ml-random-forest').RandomForestRegression
const { getData } = require('./data');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

function processData(data) {
  const {
    PDJ_TN,
    PDJ_TP, 
    PDJ_NH,
    PDJ_SS, 
    PDJ_PH, 
    PDJ_COD,
    GXC_TN,
    GXC_TP,
    GXC_NH, 
    GXC_SS, 
    GXC_COD,
    JYJ_C2,
    JYJ_C3,
    JYJ_C4
  } = data
  const dataset = []
  // 数据集生成
  const min = Math.min(PDJ_TN.length,
  PDJ_TP.length,
  PDJ_NH.length,
  PDJ_SS.length ,
  PDJ_PH.length ,
  PDJ_COD.length,
  GXC_TN.length,
  GXC_TP.length,
  GXC_NH.length,
  GXC_SS.length,
  GXC_COD.length,
  JYJ_C2.length,
  JYJ_C3.length,
  JYJ_C4.length)
  let i = 0
  while(i < min) {
    dataset.push([
      PDJ_TN[i].VAL,
      PDJ_TP[i].VAL, 
      PDJ_NH[i].VAL,
      PDJ_SS[i].VAL, 
      PDJ_PH[i].VAL, 
      PDJ_COD[i].VAL,
      GXC_TN[i].VAL,
      GXC_TP[i].VAL,
      GXC_NH[i].VAL, 
      GXC_SS[i].VAL, 
      GXC_COD[i].VAL,
      JYJ_C2[i].VAL,
      JYJ_C3[i].VAL,
      JYJ_C4[i].VAL
    ].map(Number))
    i++
  }
  return dataset
}


;(async function () {
  const rawData = await getData()
  const result = processData(rawData)

  const regression5 = RFRegression.load(JSON.parse(readFileSync('./model5.json', 'utf8')))
  const regression6 = RFRegression.load(JSON.parse(readFileSync('./model6.json', 'utf8')))
  const regression7 = RFRegression.load(JSON.parse(readFileSync('./model7.json', 'utf8')))

  const input = result.map(item => item.slice(0, 11))
  const result5 = regression5.predict(input);
  const result6 = regression6.predict(input);
  const result7 = regression7.predict(input);
  
  const csvWriter = createCsvWriter({
    path: './output.csv',
    header: [
        {id: '[JYJ]AI_CAL[5]', title: '[JYJ]AI_CAL[5]'},
        {id: '[JYJ]AI_CAL[6]', title: '[JYJ]AI_CAL[6]'},
        {id: '[JYJ]AI_CAL[7]', title: '[JYJ]AI_CAL[7]'}
    ]
  });

  const records = result.map((item, index) => {
    return {
      "[JYJ]AI_CAL[5]": result5[index],
      "[JYJ]AI_CAL[6]": result6[index],
      "[JYJ]AI_CAL[7]": result7[index],
    }
  })

  csvWriter.writeRecords(records)       // returns a promise
  .then(() => {
      console.log('...Done');
  });

})();




 

 
