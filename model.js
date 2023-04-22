const { readFileSync } = require('fs');
const RFRegression = require('ml-random-forest').RandomForestRegression

function predict(data) {
  const model = JSON.parse(readFileSync('./model.json', 'utf8'))
  const regression = RFRegression.load(model)

  const result = regression.predict(data)
  return result
}
