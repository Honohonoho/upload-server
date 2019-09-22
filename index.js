const express = require('express')
const multer = require('multer')
const cors = require('cors')
const app = express()
const upload = multer({dest: 'uploads/'})

app.options('/upload', cors())
app.get('/', (req, res, next)=> {
    res.send('hello')
})

app.post('/upload', cors(), upload.single('file'), (req, res, next)=> {
    // res.set('Access-Control-Allow-Origin', '*') instead by cors()
    res.send(req.file.filename)
})

app.get('/preview/:id', cors(), (req, res)=> {
    console.log(req.params.id)
    res.sendFile(`uploads/${req.params.id}`, {
        root: __dirname,
        headers: {
            'Content-Type': 'imag/jpeg'
        }
    }, (error)=>{
        if(error) {
            res.status(404).send('file not found')
        }
    })
})

var port = process.env.PORT || 3000
console.log('port:',port)
app.listen(port)
