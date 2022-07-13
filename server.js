const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;

const db = require('./config/mongoose');


const publicStaticDirPath = path.join(__dirname,'/public');
const viewsPath = path.join(__dirname, '/views');
// const partialsPath = path.join(__dirname, '../templates/partials');

// Template engine
app.set('view engine','ejs');
app.set('views',viewsPath);
// hbs.registerPartials(partialsPath);

app.use(express.static(publicStaticDirPath));
app.use(express.json());

// Routes
app.use('/api/files',require('./routes/files'));
app.use('/files/download',require('./routes/download')); 

// app.get('/files/download/', (req,res)=>{
//     console.log("hii");
//     res.send("<h1>HLO</h1>")
// })

app.get('/',(req,res)=>{
    return res.render('index');
})

app.use('/files',require('./routes/show'));
// app.use('/')


app.listen(PORT ,() =>{
    console.log(`Successfully running on port : ${PORT}`);
});

