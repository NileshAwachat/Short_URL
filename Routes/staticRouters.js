const express = require('express')
const URL = require('../Models/url')

const router = express.Router();
router.get('/',async(req,res)=>{
  try {
    const allurls = await URL.find({})
    return res.render('home',{
      urls:allurls,
    })
  } catch (error) {
    console.error('Error fetching URLs:', error)
    return res.status(500).send('Internal Server Error')
  }
})

router.get('/signup',(req,res)=>{
  return res.render('signup')
})

module.exports = router
