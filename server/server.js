// import {express} from 'express'
// import {mock} from 'mockjs'
import express from 'express'
import mock from 'mockjs'


const app = express()
const random = mock.Random

//设置跨域
app.all('*', (req, res, next)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    res.header('Access-Control-Allow-Methods', '*')
    res.header('Content-Type', 'application/json;charset=utf-8')
    next()
})

// 获取文章列表
app.get('/post', (req, res) => {
    let array = []
    for (let i=0;i<100;i++) {
        array.push(
            mock.mock({
                id:i+1,
                title:random.cparagraph(1),
                content:random.cparagraph(2,5),
                time:random.datetime('yyyy-MM-dd hh:mm:ss'),
                author:random.cname(),
                'like|1-1000':1 // 随机数，1-1000
            })
        )
    }

    let perPageNumber = Number(req.query.perPageNumber ?? 10)
    let currentPage = Number(req.query.currentPage ?? 1)
    let totalPage = Math.ceil(array.length/perPageNumber) 

    let start = (currentPage - 1)*perPageNumber
    let end = currentPage*perPageNumber > array.length ? array.length : currentPage*perPageNumber
    let data = array.slice(start, end)
    res.json({
        CurrentPage: currentPage,
        TotalPage: totalPage,
        Content: data
    })
})

// 端口
app.listen(3001, () => {
    console.log('Server port : 3001')
})