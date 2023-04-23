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

module.exports = {
  getData,
  processData
}