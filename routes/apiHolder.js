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
    console.log(req)
    if(req.body.username != null && req.body.password != null)
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
    }else{
        res.send("inccorrect params")
    }
})

router.get("/login", function(req, res)
{
    console.log(req)
    dbMod.Login(req,function(err, send)
    {
        if(err)
        {
            res.send(err)
        }else{
            if (send = "")
            {
                res.send(null)
            }else{
                res.send(send)
            }


           
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

router.get("/getallusers", function(req, res)
{
    dbMod.getAllUsers(req, res)
})

router.get("/getallirooms", function(req, res)
{
    dbMod.getAllInCompleteRooms(req, res)
})