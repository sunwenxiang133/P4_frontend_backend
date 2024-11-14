const client=require('../db/database')

const test = async (key) => {
    return client.get(key);
    try {
    // 使用 Promise 包装 db.get，使其支持 async/await
    const data = await new Promise((resolve, reject) => {
      client.get(key, (err, result) => {
        if (err) {
          reject(`Error connecting to DB or retrieving value: ${err}`);
        } else if (result === null) {
          reject(`No data found for key: ${key}`);
        } else {
          resolve(result);  // 返回查询到的值
        }
      });
    });
    return data;
  } catch (error) {
    throw error;  // 抛出异常，供调用方处理
  } 
};

module.exports={
    test
}