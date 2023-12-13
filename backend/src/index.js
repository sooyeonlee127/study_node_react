// nodejs의 진입점이 되는 파일
const express = require('express')

const app = express()
const port = 4000

app.get('/', (req, res) => {
    res.send('안녕하세요.')
})
app.listen(port)