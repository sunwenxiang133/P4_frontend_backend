const testModel=require('../model/test')

exports.handleString=dataString=>{
  // 替换单引号为双引号，确保JSON格式正确
  const formattedString = dataString.replace(/'/g, '"');

  // 尝试解析修正后的字符串
  try {
    const data = JSON.parse(formattedString);

    // 正则表达式匹配info字段中的值
    const regex = /\((\d+),\s*(\d+),\s*(\d+),\s*(\d+),\s*(\d+),\s*(\d+),\s*([\d\.]+),\s*([\d\.]+),\s*(\d+)\)/;

    // 映射每个对象并解析info字段
    return data.map(item => {
      const matches = item.info.match(regex);
      if (matches) {
        return {
          osd: parseInt(item.osd),
          info: {
            delay: parseInt(matches[1]),
            delay_jitter_rate: parseInt(matches[2]),
            cpu_usage: parseInt(matches[3]),
            memory_usage: parseInt(matches[4]),
            OSD_reading_speed: parseInt(matches[5]),
            OSD_writing_speed: parseInt(matches[6]),
            packets_send_speed: parseFloat(matches[7]),
            packets_receive_speed: parseFloat(matches[8]),
            queued_data: parseInt(matches[9])
          }
        };
      }
      return item; // 如果没有匹配，返回原始项
    });
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return []; // 返回空数组作为错误处理
  } 
}

// let lineChartObject=[];
// let tmpOSDreadingArray = [0,0,0,0,0,0,0]; // 用于存储最近7秒内的数据
// let tmpOSDwritingArray = [0,0,0,0,0,0,0]; // 用于存储最近7秒内的数据
// let tmpPacketsSendArray = [0,0,0,0,0,0,0]; // 用于存储最近7秒内的数据
// let tmpPacketsReceiveArray = [0,0,0,0,0,0,0]; // 用于存储最近7秒内的数据
let osdHistory1={}
let osdHistory2={}
let osdHistory3={}
let finalResult1=[];
let finalResult2=[];
let finalResult3=[];

exports.getLineChartObject1=()=>{
    return finalResult1;
}

exports.getLineChartObject2=()=>{
    return finalResult2;
}

exports.getLineChartObject3=()=>{
    return finalResult3;
}


exports.handleLineChart1=async(string)=>{
    let tmpString=await testModel.test('192.168.0.50');
    let tmp=this.handleString(tmpString);

    // 更新每个 OSD 对应的历史数据
    tmp.forEach((item) => {
        const osdId = item.osd;
        // console.log('123',item);
        
        const readingSpeed = item.info.OSD_reading_speed;
        const writingSpeed = item.info.OSD_writing_speed;
        const sendSpeed = item.info.packets_send_speed;
        const receiveSpeed = item.info.packets_receive_speed;

        // 如果该 osd 的历史数据数组不存在，创建一个空数组
        if (!osdHistory1[osdId]) {
            console.log('123123',item.osd);    
            osdHistory1[osdId] = {
                OSD_reading_speed: [],
                OSD_writing_speed: [],
                packets_send_speed: [],
                packets_receive_speed: []
            };
        }

        // 向该 osd 的历史数据数组中添加新的数据
        osdHistory1[osdId].OSD_reading_speed.push(readingSpeed);
        osdHistory1[osdId].OSD_writing_speed.push(writingSpeed);
        osdHistory1[osdId].packets_send_speed.push(sendSpeed);
        osdHistory1[osdId].packets_receive_speed.push(receiveSpeed);

        // 如果历史数据数组长度超过 7，删除最旧的一条
        if (osdHistory1[osdId].OSD_reading_speed.length > 7) {
        osdHistory1[osdId].OSD_reading_speed.shift();  // 删除最旧的一条数据
        }
        if (osdHistory1[osdId].OSD_writing_speed.length > 7) {
        osdHistory1[osdId].OSD_writing_speed.shift();  // 删除最旧的一条数据
        }
        if (osdHistory1[osdId].packets_send_speed.length > 7) {
        osdHistory1[osdId].packets_send_speed.shift();  // 删除最旧的一条数据
        }
        if (osdHistory1[osdId].packets_receive_speed.length > 7) {
        osdHistory1[osdId].packets_receive_speed.shift();  // 删除最旧的一条数据
        }
    });

    // 打印每个 OSD 对应的历史数据
    finalResult1 = Object.keys(osdHistory1).map((osdId) => ({
        osd: osdId,
        info: {
        OSD_reading_speed: osdHistory1[osdId].OSD_reading_speed,
        OSD_writing_speed: osdHistory1[osdId].OSD_writing_speed,
        packets_send_speed: osdHistory1[osdId].packets_send_speed,
        packets_receive_speed: osdHistory1[osdId].packets_receive_speed
        }
    }));
    // console.log(finalResult1);
        

    // const MAX_SIZE = 6; // 数组最大长度
    // tmp.forEach(element => {
    //       lineChartObject.forEach(element2=>{
    //         if(element2.osd!==element.osd){
    //             lineChartObject.push({
    //                 osd:element.osd
    //             })
    //         }
    //         if(element2.osd===element.osd){
    //             element2.info.tmpOSDreadingArray.push(element.info.OSD_reading_speed)
    //             console.log('测试',lineChartObject);
                
    //         }
    //       })
    // });
    // tmpArray.push(tmp[0].info.packets_send_speed);

//   // 如果数组长度超过7，移除最早的数据
//   if (tmpArray.length >= MAX_SIZE) {
    
//     tmpArray.shift();
//     console.log(tmpArray);
//   }

  // 打印当前数组状态，实际使用时可以根据需要进行调整或删除
}


exports.handleLineChart2=async(string)=>{
    let tmpString=await testModel.test('192.168.0.51');
    let tmp=this.handleString(tmpString);

    // 更新每个 OSD 对应的历史数据
    tmp.forEach((item) => {
        const osdId = item.osd;
        const readingSpeed = item.info.OSD_reading_speed;
        const writingSpeed = item.info.OSD_writing_speed;
        const sendSpeed = item.info.packets_send_speed;
        const receiveSpeed = item.info.packets_receive_speed;

        // 如果该 osd 的历史数据数组不存在，创建一个空数组
        if (!osdHistory2[osdId]) {
        osdHistory2[osdId] = {
            OSD_reading_speed: [],
            OSD_writing_speed: [],
            packets_send_speed: [],
            packets_receive_speed: []
        };
        }

        // 向该 osd 的历史数据数组中添加新的数据
        osdHistory2[osdId].OSD_reading_speed.push(readingSpeed);
        osdHistory2[osdId].OSD_writing_speed.push(writingSpeed);
        osdHistory2[osdId].packets_send_speed.push(sendSpeed);
        osdHistory2[osdId].packets_receive_speed.push(receiveSpeed);

        // 如果历史数据数组长度超过 7，删除最旧的一条
        if (osdHistory2[osdId].OSD_reading_speed.length > 7) {
        osdHistory2[osdId].OSD_reading_speed.shift();  // 删除最旧的一条数据
        }
        if (osdHistory2[osdId].OSD_writing_speed.length > 7) {
        osdHistory2[osdId].OSD_writing_speed.shift();  // 删除最旧的一条数据
        }
        if (osdHistory2[osdId].packets_send_speed.length > 7) {
        osdHistory2[osdId].packets_send_speed.shift();  // 删除最旧的一条数据
        }
        if (osdHistory2[osdId].packets_receive_speed.length > 7) {
        osdHistory2[osdId].packets_receive_speed.shift();  // 删除最旧的一条数据
        }
    });

    // 打印每个 OSD 对应的历史数据
    finalResult2 = Object.keys(osdHistory2).map((osdId) => ({
        osd: osdId,
        info: {
        OSD_reading_speed: osdHistory2[osdId].OSD_reading_speed,
        OSD_writing_speed: osdHistory2[osdId].OSD_writing_speed,
        packets_send_speed: osdHistory2[osdId].packets_send_speed,
        packets_receive_speed: osdHistory2[osdId].packets_receive_speed
        }
    }));
    // console.log(finalResult2);
        

    // const MAX_SIZE = 6; // 数组最大长度
    // tmp.forEach(element => {
    //       lineChartObject.forEach(element2=>{
    //         if(element2.osd!==element.osd){
    //             lineChartObject.push({
    //                 osd:element.osd
    //             })
    //         }
    //         if(element2.osd===element.osd){
    //             element2.info.tmpOSDreadingArray.push(element.info.OSD_reading_speed)
    //             console.log('测试',lineChartObject);
                
    //         }
    //       })
    // });
    // tmpArray.push(tmp[0].info.packets_send_speed);

//   // 如果数组长度超过7，移除最早的数据
//   if (tmpArray.length >= MAX_SIZE) {
    
//     tmpArray.shift();
//     console.log(tmpArray);
//   }

  // 打印当前数组状态，实际使用时可以根据需要进行调整或删除
}

exports.handleLineChart3=async(string)=>{
    let tmpString=await testModel.test('192.168.0.52');
    let tmp=this.handleString(tmpString);

    // 更新每个 OSD 对应的历史数据
    tmp.forEach((item) => {
        const osdId = item.osd;
        const readingSpeed = item.info.OSD_reading_speed;
        const writingSpeed = item.info.OSD_writing_speed;
        const sendSpeed = item.info.packets_send_speed;
        const receiveSpeed = item.info.packets_receive_speed;

        // 如果该 osd 的历史数据数组不存在，创建一个空数组
        if (!osdHistory3[osdId]) {
        osdHistory3[osdId] = {
            OSD_reading_speed: [],
            OSD_writing_speed: [],
            packets_send_speed: [],
            packets_receive_speed: []
        };
        }

        // 向该 osd 的历史数据数组中添加新的数据
        osdHistory3[osdId].OSD_reading_speed.push(readingSpeed);
        osdHistory3[osdId].OSD_writing_speed.push(writingSpeed);
        osdHistory3[osdId].packets_send_speed.push(sendSpeed);
        osdHistory3[osdId].packets_receive_speed.push(receiveSpeed);

        // 如果历史数据数组长度超过 7，删除最旧的一条
        if (osdHistory3[osdId].OSD_reading_speed.length > 7) {
        osdHistory3[osdId].OSD_reading_speed.shift();  // 删除最旧的一条数据
        }
        if (osdHistory3[osdId].OSD_writing_speed.length > 7) {
        osdHistory3[osdId].OSD_writing_speed.shift();  // 删除最旧的一条数据
        }
        if (osdHistory3[osdId].packets_send_speed.length > 7) {
        osdHistory3[osdId].packets_send_speed.shift();  // 删除最旧的一条数据
        }
        if (osdHistory3[osdId].packets_receive_speed.length > 7) {
        osdHistory3[osdId].packets_receive_speed.shift();  // 删除最旧的一条数据
        }
    });

    // 打印每个 OSD 对应的历史数据
    finalResult3 = Object.keys(osdHistory3).map((osdId) => ({
        osd: osdId,
        info: {
        OSD_reading_speed: osdHistory3[osdId].OSD_reading_speed,
        OSD_writing_speed: osdHistory3[osdId].OSD_writing_speed,
        packets_send_speed: osdHistory3[osdId].packets_send_speed,
        packets_receive_speed: osdHistory3[osdId].packets_receive_speed
        }
    }));
    // console.log(finalResult3);
        

    // const MAX_SIZE = 6; // 数组最大长度
    // tmp.forEach(element => {
    //       lineChartObject.forEach(element2=>{
    //         if(element2.osd!==element.osd){
    //             lineChartObject.push({
    //                 osd:element.osd
    //             })
    //         }
    //         if(element2.osd===element.osd){
    //             element2.info.tmpOSDreadingArray.push(element.info.OSD_reading_speed)
    //             console.log('测试',lineChartObject);
                
    //         }
    //       })
    // });
    // tmpArray.push(tmp[0].info.packets_send_speed);

//   // 如果数组长度超过7，移除最早的数据
//   if (tmpArray.length >= MAX_SIZE) {
    
//     tmpArray.shift();
//     console.log(tmpArray);
//   }

  // 打印当前数组状态，实际使用时可以根据需要进行调整或删除
}