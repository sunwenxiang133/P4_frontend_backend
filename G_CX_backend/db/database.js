const redis=require('redis')

// 创建Redis客户端
const client = redis.createClient({
  socket: {
    host:  '172.25.0.50',       // 远程服务器的 IP 地址
    port: 6379,      // Redis 默认端口
  },
});

// 连接到Redis时的错误处理
client.on('error', (err) => {
  console.error('Redis connection error:', err);
});

// 连接到Redis服务器
// client.connect();
// 连接到 Redis
client.connect()
  .then(() => {
    console.log('success');
    
    console.log('Successfully connected to Redis');
  })
  .catch((err) => {
    console.log('error');
    
    console.error('Error connecting to Redis:', err);
  });

module.exports=client