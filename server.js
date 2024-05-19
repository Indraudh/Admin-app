const express = require('express')
const app = express()
app.use(express.json());
const userRoute = require('./routes/userRoute');
const db = require('./db');
app.use('/api/clients/' , userRoute);

const port =process.env.PORT || 4000

if(process.env.NODE_ENV === 'production')
{
     app.use('/' , express.static('./client/build'))

     app.get('*' , (req, res)=>{
         res.sendFile(path.resolve(__dirname, './client/build/index.html'))
     })
}

app.listen(port, () => {
  console.log(`Node JS server started`);
})