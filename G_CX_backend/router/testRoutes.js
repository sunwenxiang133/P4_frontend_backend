const express=require('express')
const router=express.Router({})
const userController=require('../controller/testController');

router.post('/test',userController.test)
router.post('/server1info',userController.server1Info)
router.post('/server2info',userController.server2Info)
router.post('/server3info',userController.server3Info)
router.post('/getlinechart1',userController.getLineChartObject1)
router.post('/getlinechart2',userController.getLineChartObject2)
router.post('/getlinechart3',userController.getLineChartObject3)

exports.router=router
exports.routerPass='/test'