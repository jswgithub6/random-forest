const { writeFileSync, readFileSync } = require('fs');
const { getData } = require('./data');
const RFRegression = require('ml-random-forest').RandomForestRegression

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
  while(i < 1000) {
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
  const data = await getData()
  // 处理data
  const dataset = processData(data)

  const trainingSet = new Array(dataset.length);
  const predictions = new Array(dataset.length);

  for (let i = 0; i < dataset.length; ++i) {
    trainingSet[i] = dataset[i];
    predictions[i] = dataset[i][11];
  }
  const options = {
    seed: 3,
    maxFeatures: 14,
    replacement: false,
    nEstimators: 200
  };
  
  console.log('start')
  // 训练好的模型
  const model = JSON.parse(readFileSync('./model.json', 'utf8'))
  const regression = RFRegression.load(model)
  // 训练模型
  // const regression = new RFRegression(options);
  // regression.train(trainingSet, predictions);
  // const model = regression.toJSON()
  // writeFileSync('./model.json', JSON.stringify(model))

  const result = regression.predict(trainingSet);

  for(let i = 100; i < 150; i++) {
    console.log(predictions[i], result[i])  
  }
})();
