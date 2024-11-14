const testModel=require('../model/test');
const testService=require('../service/test.service');

const test = async (req, res, next) => {
//    console.log(req.body);
   const test2=await testModel.test('0')
   console.log('0',test2);
   
   res.send({
    msg:'请求成功',
    status:200,
    data:{
        serverInfo:test2
    }
   })
}
const intervalId1=setInterval(testService.handleLineChart1,1000)
const intervalId2=setInterval(testService.handleLineChart2,1000)
const intervalId3=setInterval(testService.handleLineChart3,1000)

const server1Info = async (req, res, next) => {
//    console.log(req.body);
   const test2=await testModel.test('192.168.0.50')
   console.log('192.168.0.50',test2);
   
   res.send({
    msg:'请求成功',
    status:200,
    data:{
        serverInfo:testService.handleString(test2).sort((a, b) => a.osd - b.osd)
    }
   })
}

const server2Info = async (req, res, next) => {
//    console.log(req.body);
   const test2=await testModel.test('192.168.0.51')
   console.log('192.168.0.51',test2);
   
   res.send({
    msg:'请求成功',
    status:200,
    data:{
        serverInfo:testService.handleString(test2).sort((a, b) => a.osd - b.osd)
    }
   })
}

const server3Info = async (req, res, next) => {
//    console.log(req.body);
   const test2=await testModel.test('192.168.0.52')
   console.log('192.168.0.52',test2);
   
   res.send({
    msg:'请求成功',
    status:200,
    data:{
        serverInfo:testService.handleString(test2).sort((a, b) => a.osd - b.osd)
    }
   })
}

const getLineChartObject1=async(req,res,next)=>{
    const lineChartObject=testService.getLineChartObject1('192.168.0.50');
    res.send({
        msg:'请求成功',
        status:200,
        data:{
            lineChartObject:lineChartObject
        }
    })
}

const getLineChartObject2=async(req,res,next)=>{
    const lineChartObject=testService.getLineChartObject2('192.168.0.51');
    res.send({
        msg:'请求成功',
        status:200,
        data:{
            lineChartObject:lineChartObject
        }
    })
}


const getLineChartObject3=async(req,res,next)=>{
    const lineChartObject=testService.getLineChartObject3('192.168.0.52');
    res.send({
        msg:'请求成功',
        status:200,
        data:{
            lineChartObject:lineChartObject
        }
    })
}

module.exports={
    test,
    server1Info,
    server2Info,
    server3Info,
    getLineChartObject1,
    getLineChartObject2,
    getLineChartObject3,
}