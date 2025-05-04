const express= require('express')
const app = express()
const path = require('path')
const urlRout = require('./Routes/url')
const staticRoute = require('./Routes/staticRouters')
const {connectionToMongooDB} = require('./connection')
const url = require('./Models/url')
const PORT = 8001

app.set('view engine','ejs')
app.set('views',path.resolve('./views'))
app.use('/',staticRoute)
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/url',urlRout)

    app.get('/test',async(req,res)=>{
        const allUrls = await url.find({} );
        return res.render('home', {urls: allUrls})
        // end(`<html>
        //     <head></head>
        //     <body>
        //     <ol>
        //     ${allUrls.map(url=>`<li>${url.shortId}-${url.redirectURL} - ${url.visitHistory.length}</li>`).join('')}
        //     </ol>
        //     </body>
        //     </html>`)
    })

app.get('/url/:shortid', async (req, res) => {
    try {
        const shortId = req.params.shortid;
        const entry = await url.findOneAndUpdate(
            { shortId },
                       { $push: { visitHistory: { timestamp: Date.now() } } }
        );
        if (!entry) {
            return res.status(404).json({ error: 'Short URL not found' });
        }
        res.redirect(entry.redirectURL);
    } catch (error) {
        console.error('Error in redirect route:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

connectionToMongooDB('mongodb://127.0.0.1:27017/short_url')
    .then(() => console.log('mongo connected'))
    .catch((error) => {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    });

app.listen(PORT, () => console.log(`serverStarted: ${PORT}`));
