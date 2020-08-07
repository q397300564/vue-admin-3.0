module.exports = {
  // 基础路径
  publicPath: process.env.NODE_VUE === 'production' ? '' : '/',
  // 输出文件目录
  outputDir: process.env.NODE_VUE === 'production' ? 'dist' : 'devdist',
  // build时放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: '',
  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  indexPath: 'index.html',
  // 默认在生成的静态资源文件名中包含hash以控制缓存
  filenameHashing: true,
  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码 (在生产构建时禁用 eslint-loader)
  lintOnSave: process.env.NODE_ENV !== 'production',
  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: false,
  // Babel 显式转译列表
  transpileDependencies: [],
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  productionSourceMap: true,
  // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性（注：仅影响构建时注入的标签）
  crossorigin: '',
  // css 的处理
  css: {
    // 当为true时，css文件名可省略 module 默认为 false
    requireModuleExtension: true, // 这个时3.0版本的到v4.0 被 css.requireModuleExtension 取代, 先选含义相反。
    /**
     * 是否将组件中的 CSS 提取至一个独立的 CSS 文件中,当作为一个库构建时，你也可以将其设置为 false 免得用户自己导入 CSS
     * 默认生产环境下是 true，开发环境下是 false
     * **/

    extract: false,
    // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能
    sourceMap: false,
    // 向 CSS 相关的 loader 传递选项(支持 css-loader postcss-loader sass-loader less-loader stylus-loader)
    loaderOptions: {
      css: {},
      // 给 sass-loader 传递选项 地址：https://cli.vuejs.org/zh/guide/css.html#%E5%90%91%E9%A2%84%E5%A4%84%E7%90%86%E5%99%A8-loader-%E4%BC%A0%E9%80%92%E9%80%89%E9%A1%B9
      // sass: {
      //   // @/ 是 src/ 的别名
      //   // 所以这里假设你有 `src/style/main.sass` 这个文件
      //   // 注意：在 sass-loader v8 中，这个选项名是 "prependData"
      //   prepenData: `@import "./src/styles/main.scss"`
      // }
      // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
      // 因为 `scss` 语法在内部也是由 sass-loader 处理的
      // 但是在配置 `prependData` 选项的时候
      // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
      // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
      scss: {
        prependData: `@import "./src/styles/main.scss";`
      }
    }
  },
  /**
   * 对内部的 webpack 配置（比如修改、增加Loader选项）(链式操作)
   * **/
  chainWebpack: () => { },
  /**
   * 1. 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中.
   *
   * 2. 如果你需要基于环境有条件地配置行为，或者想要直接修改配置，那就换成一个函数 (该函数会在环境变量被设置之后懒执行)。
   * 该方法的第一个参数会收到已经解析好的配置。在函数内，你可以直接修改配置，或者返回一个将会被合并的对象
   * **/
  configureWebpack: {},
  // 所有 webpack-dev-server 的选项都支持
  devServer: {},

  // 是否为 Babel 或 TypeScript 使用 thread-loader
  parallel: require('os').cpus().length > 1,

  // 向 PWA 插件传递选项
  pwa: {},

  // 可以用来传递任何第三方插件选项
  pluginOptions: {}
}
