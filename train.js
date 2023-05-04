const { getData } = require('./data');
const { writeFileSync } = require('fs');
const RFRegression = require('ml-random-forest').RandomForestRegression

function train(options, trainingSet, predictions, outputPath) {
  console.log('模型训练中...')
  const regression = new RFRegression(options)
  regression.train(trainingSet, predictions)
  const model = regression.toJSON()
  writeFileSync(outputPath, JSON.stringify(model))
  console.log('训练完成')
}

;(async function () {
  const rawData = await getData('./data/data_Train.csv')
  const trainingSet = new Array(rawData.length).fill(0)
  const predictions = new Array(3).fill(0).map(() => new Array(rawData.length).fill(0)) 
  for (let i = 0; i < rawData.length; i++) {
    trainingSet[i] = rawData[i].slice(1, 15).map(Number)
    predictions[0][i] = Number(rawData[i][15])
    predictions[1][i] = Number(rawData[i][16])
    predictions[2][i] = Number(rawData[i][17])
  }

  const options = {
    seed: 3,
    maxFeatures: 3,
    replacement: false,
    nEstimators: 200
  };
  train(options, trainingSet, predictions[0], './model5.json')
  train(options, trainingSet, predictions[1], './model6.json')
  train(options, trainingSet, predictions[2], './model7.json')
  console.log('done')
})();
