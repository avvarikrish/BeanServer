var express = require("express")
var router = express.Router()
var dbMod = require("../dbModify.js")

module.exports = router

router.get("/", function(req, res)
{
    res.send("good")
})


router.post("/accounts" ,function(req, res)
{
    dbMod.CreateAccount(req, function(err, send)
    {
        if (err)
        {
            res.send(err)
            
        }else{
            res.send(send)
        }
        
    });
})

router.get("/login", function(req, res)
{
    dbMod.Login(req,function(err, send)
    {
        if(err)
        {
            res.send(err)
        }else{
            res.send(send)
        }
    })
})

router.post("/addroom", function(req, res)
{
    dbMod.AddRoom(req,res)
})

router.get("/exists", function(req, res)
{
    dbMod.CheckExistance(req,res)
})