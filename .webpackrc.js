import path from 'path'
export default {
  "extraBabelPlugins": [["import", {
    "libraryName": "antd",
    "libraryDirectory": "es",
    "style": true
  }]],
  "alias": {
    "@": path.resolve(__dirname, 'src')
  }
}
