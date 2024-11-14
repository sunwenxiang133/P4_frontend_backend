const app=require('./app')

// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By",' 3.2.1')
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });




// const cors=require('cors')

// const redis=require('redis')

// // 创建Redis客户端
// const client = redis.createClient({
//   host: '172.25.0.50', 
//   port: 6379,
//   password: 'strav123',
//   family: 4
// });



// 连接到Redis时的错误处理
// client.on('error', (err) => {
//   console.error('Redis connection error:', err);
// });

// client.connect();
// 连接到Redis服务器

// module.exports=client
// app.use(cors())

app.listen(12345,()=>{
    console.log('服务器已启动，端口12345');
})