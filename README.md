# avam-node-ts

Before starting the application, run the following command:

npm install avam-node-ts-1.0.0.tgz
// "postbuild": "npm pack && mv ./\*.tgz ./dist",
https://appdividend.com/2019/06/06/what-is-process-env-in-node-js-environment-variables-in-node-js/

 "prebuild": "rm -rf dist && rm -rf build",
    "build": "tsc --build tsconfig.json",
    "postbuild": "cp package.json ./build && npm run bundle",
    "prebundle": "mkdir -p ./dist && cd build && npm i",
    "bundle": "cd build && npm pack && cp ./*.tgz ../dist",
    "postbundle": "rm -rf build",
    "compile": "tsc --build tsconfig.json -w",
    "nodewatch": "nodemon ./dist/index.js",
    "test": "echo \"Error: no test specified\" && exit 1"