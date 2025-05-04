const shortid= require('shortid')
const url = require('../Models/url')

async function HandleGenerateShortURL(req,res) {
    try {
        const body = req.body;
        if(!body.url)
            return res.status(400).json({error: 'url is required'})

        const shortID = shortid.generate()

        const newUrl = await url.create({
            shortId: shortID,
            redirectURL: body.url,
            visitHistory: [],
        })

        return res.render('home',{
            id:shortID,
        })
        // return res.json({id: newUrl.shortId})
    } catch (error) {
        console.error('Error in HandleGenerateShortURL:', error)
        return res.status(500).json({error: 'Internal Server Error'})
    }
}
async function handleGetAnalytics(req,res) {
    try {
        const shortID = req.params.shortid;
        const result = await url.findOne({shortId: shortID})
        if (!result) {
            return res.status(404).json({ error: 'Short URL not found' });
        }
        return res.json({
            totalClicks: result.visitHistory.length,
            analytics: result.visitHistory
        })
    } catch (error) {
        console.error('Error in handleGetAnalytics:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
} 
module.exports = {HandleGenerateShortURL,handleGetAnalytics}
