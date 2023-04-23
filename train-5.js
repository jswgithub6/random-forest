const { writeFileSync } = require('fs');
const { getData, processData } = require('./data');
const RFRegression = require('ml-random-forest').RandomForestRegression

;(async function () {
  const data = await getData()
  // 处理data
  const dataset = processData(data)

  const trainingSet = new Array(dataset.length);
  const predictions = new Array(dataset.length);
  
  for (let i = 0; i < dataset.length; ++i) {
    trainingSet[i] = dataset[i].slice(0, 11);
    predictions[i] = dataset[i][11];
  }
  const options = {
    seed: 3,
    maxFeatures: 11,
    replacement: false,
    nEstimators: 200
  };
  
  console.log('正在训练')
  // 训练模型
  const regression = new RFRegression(options);
  regression.train(trainingSet, predictions);
  const model = regression.toJSON()
  writeFileSync('./model5.json', JSON.stringify(model))
  console.log('训练完成')
})();
