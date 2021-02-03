const express = require('express')

const path = require('path')
const app = express();


app.use(express.json());
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private')
  next()
})

app.use( express.static( `${__dirname}/./build` ) );



app.get('*', (req, res) => { res.sendFile(path.join(__dirname, './build/index.html')); })

app.listen('4567', () => console.log(`Now arriving at 4567`));