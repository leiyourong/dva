import path from 'path'
export default {
  extraBabelPlugins: [["import", {
    "libraryName": "antd",
    "libraryDirectory": "es",
    "style": true
  }]],
  alias: {
    "@": path.resolve(__dirname, 'src')
  },
  browserslist: [
    "> 1%",
    "last 2 versions"
  ],
  env: {
    development: {
      extraBabelPlugins: ["dva-hmr"],
      port: 9009
    }
  }
}
