const express = require("express");
const mongoose = require("mongoose");
const router = express.Router({mergeParams: true});
const Store = require("../models/store")
const Item = require("../models/item")
const Entry = require("../models/entry")
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
// adding new stock - /api/entry/stock-in
router.post("/stock-in",  async (req,res)=>{
    try{
        const newPP = ((parseInt(req.body.currQuantity)*parseInt(req.body.currPP)) + (parseInt(req.body.quantity)*parseInt(req.body.pp)))/(parseInt(req.body.currQuantity)+parseInt(req.body.quantity));
        const newSP = ((parseInt(req.body.currQuantity)*parseInt(req.body.currSP)) + (parseInt(req.body.quantity)*parseInt(req.body.sp)))/(parseInt(req.body.currQuantity)+parseInt(req.body.quantity));
        await Item.updateMany({_id: req.body.id}, { $set: { quantity: parseInt(req.body.currQuantity) + parseInt(req.body.quantity), purchasePrice: parseInt(newPP)}})
        const newEntry = new Entry({
            partyName: req.body.partyName,
            itemName: req.body.itemName,
            quantity: req.body.quantity,
            purchasePrice: req.body.pp,
            sellPrice: req.body.sp,
            operation: "purchase",
            new: true
        });
        const store = await Store.findById(req.body.sid);
        store.entries.push(newEntry);
        await newEntry.save();
        await store.save();
        res.json({status: true});   
    }
    catch(err){
        console.log(err);
        res.json({status: false});
    }
});


// Fetch all entries - /api/entry/entries
router.post("/entries", async(req,res)=>{
    const token = req.body.jwt;
    if (token) {
      jwt.verify(
        token,
        JWT_SECRET,
        async (err, decodedToken) => {
          if (err) {
            res.json({ status: false });
          } else {
            // console.log(decodedToken);
            const store = await Store.findById(decodedToken.store.id).populate('entries');
            if (store) res.json({ status: true,store: store, entries:store.entries  });
            else res.json({ status: false });
          }
        }
      );
    } else {
      res.json({ status: false });
    }
})

// Stock our Entry- /api/entry/stock-out
router.post('/stock-out', async (req,res)=>{
    try{
        if(parseInt(req.body.currQuantity)<=0){
            throw Error();
        }
        // const newSP = ((parseInt(req.body.currQuantity)*parseInt(req.body.currSP)) + (parseInt(req.body.quantity)*parseInt(req.body.sp)))/(parseInt(req.body.currQuantity)+parseInt(req.body.quantity));
        await Item.updateMany({_id: req.body.id}, { $set: { quantity: parseInt(req.body.currQuantity) - parseInt(req.body.quantity)}})
        const newEntry = new Entry({
            partyName: req.body.partyName,
            itemName: req.body.itemName,
            quantity: req.body.quantity,
            purchasePrice: req.body.pp,
            sellPrice: req.body.sp,
            operation: "sell",
            new: true
        });
        const store = await Store.findById(req.body.sid);
        store.entries.push(newEntry);
        await newEntry.save();
        await store.save();   
        res.json({status: true});
    }
    catch(err){
        console.log(err);
        res.json({status: false});
    }
})

module.exports = router