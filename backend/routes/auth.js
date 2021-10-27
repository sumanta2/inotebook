const express=require('express')

const router=express.Router()
router.get('/',(req,res)=>{     //router.get() work same as app.get() where "app=express()"
    res.json(
        {a:"thos",
        number:34})
})

module.exports=router;