var fs = require('fs'); 
var { parse } = require('csv-parse');

function getDataPDJ() {
  return new Promise((resolve, reject) => {
    const PDJ = [];
    fs.createReadStream('./data/PDJ.csv')
      .pipe(parse({columns: true, bom: true}))
      .on('data', (data) => {
        PDJ.push(data);
      })
      .on('end', () => {
        resolve(PDJ)
      });
  })
}

function getDataGXC() {
  return new Promise((resolve, reject) => {
    const GXC = [];
    fs.createReadStream('./data/GXC.csv')
      .pipe(parse({columns: true, bom: true}))
      .on('data', (data) => {
        GXC.push(data);
      })
      .on('end', () => {
        resolve(GXC)
      });    
  })
}

function getDataJYJ() {
  return new Promise((resolve, reject) => {
    const JYJ = []
    fs.createReadStream('./data/JYJ.csv')
      .pipe(parse({columns: true, bom: true}))
      .on('data', (data) => {
        JYJ.push(data);
      })
      .on('end', () => {
        resolve(JYJ)
      });
  })
}

function getData() {
  return new Promise((resolve) => {
    Promise.all([getDataPDJ(), getDataGXC(), getDataJYJ()])
    .then((value) => {
      const [PDJ, GXC, JYJ] = value
      PDJ
      const PDJ_TN = PDJ.filter((item) => item.TAG_CODE === '[PDJ]AI_CAL[12]')
      const PDJ_TP = PDJ.filter((item) => item.TAG_CODE === '[PDJ]AI_CAL[11]')
      const PDJ_NH = PDJ.filter((item) => item.TAG_CODE === '[PDJ]AI_CAL[10]')
      const PDJ_SS = PDJ.filter((item) => item.TAG_CODE === '[PDJ]AI_CAL[7]')
      const PDJ_PH = PDJ.filter((item) => item.TAG_CODE === '[PDJ]AI_CAL[8]')
      const PDJ_COD = PDJ.filter((item) => item.TAG_CODE === '[PDJ]AI_CAL[9]')
      // GXC
      const GXC_TN = GXC.filter((item) => item.TAG_CODE === '[GXC]AI_CAL[35]')
      const GXC_TP = GXC.filter((item) => item.TAG_CODE === '[GXC]AI_CAL[46]')
      const GXC_NH = GXC.filter((item) => item.TAG_CODE === '[GXC]AI_CAL[37]')
      const GXC_SS = GXC.filter((item) => item.TAG_CODE === '[GXC]AI_CAL[33]')
      const GXC_COD = GXC.filter((item) => item.TAG_CODE === '[GXC]AI_CAL[45]')
      // JYJ
      const JYJ_C2 = JYJ.filter((item) => item.TAG_CODE === '[JYJ]AI_CAL[5]')
      const JYJ_C3 = JYJ.filter((item) => item.TAG_CODE === '[JYJ]AI_CAL[6]')
      const JYJ_C4 = JYJ.filter((item) => item.TAG_CODE === '[JYJ]AI_CAL[7]')
      resolve({
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
      })
    })

  })
}

module.exports = {
  getData
}