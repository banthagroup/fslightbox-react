var p=require("path");module.exports={mode:"production",entry:"./s/o.jsx",output:{path:p.join(__dirname,""),libraryTarget:"commonjs2",filename:"./package/index.js",},resolve:{alias:{"react":p.resolve(__dirname,"./node_modules/react")}},externals:{react:{commonjs:"react",commonjs2:"react",amd:"react",root:"react"},"prop-types":{commonjs:"prop-types",commonjs2:"prop-types",amd:"prop-types",root:"prop-types"}},module:{rules:[{test:/\.(js|jsx)$/,use:{loader:"babel-loader"},exclude:/node_modules/}]}}
