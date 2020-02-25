// .fatherrc.js
const options = {
  entry: 'src/index.tsx',
  doc: {
    title: 'ming-ui', // 标题
    themeConfig: { mode: 'light' }, // 主题色
    base: '/ming-ui' // 根路由
  },
  // 额外的 babel 插件
  extraBabelPlugins: [
      /* ['babel-plugin-import', {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: true,
      }] */
  ],
  cssModules: true,
  extractCSS: true, // 是否将 css 抽离成单独的 css 文件
  lessInBabelMode: true, // 在 babel 模式下做 less 编译，基于 gulp-less，默认不开启
  runtimeHelpers: true, // 是否把 helper 方法提取到 @babel/runtime 里
  esm: 'babel', // 是否输出 esm 格式，以及指定 esm 格式的打包方式等
  cjs: 'babel', // 是否输出 cjs 格式，以及指定 cjs 格式的打包方式等
  autoprefixer: {
      browsers: ['ie>9', 'Safari >= 6'],
  }
};

export default options;
