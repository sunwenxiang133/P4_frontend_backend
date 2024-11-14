const fs = require('fs')
const useRoutes = function () {
  // console.log('执行到这了')
  fs.readdirSync(__dirname).forEach(file => {
    if (file === 'index.js') return
    const { router, routerPass } = require(`./${file}`)
    this.use(routerPass, router)
  })
}

module.exports = useRoutes