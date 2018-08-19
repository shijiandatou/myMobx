module.exports={
    entry:'./src/index.js',
    output:{
        filename:'bundle.js',
        path:require('path').resolve(__dirname,'dist')
    },
    mode:'development',
    module:{
        rules:[
            {
                test:/\.js$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['env','react','stage-0'],
                        plugins:['transform-decorators-legacy']
                    }
                }
            }
        ]
    }
}