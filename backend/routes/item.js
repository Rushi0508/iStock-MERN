const express = require("express");
const mongoose = require("mongoose");
const router = express.Router({mergeParams: true});
const Store = require("../models/store")
const Item = require("../models/item")
const Entry = require("../models/entry")
const {fetchStore} = require("../middleware");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;


// adding new item and entry - /api/item/
router.post("/",  async (req,res)=>{
    const token = req.body.jwt;
    if (token) {
      jwt.verify(
        token,
        JWT_SECRET,
        async (err, decodedToken) => {
          if (err) {
            return res.json({ status: false });
          } else {
            console.log(decodedToken);
            const store = await Store.findById(decodedToken.store.id);
            const newItem = new Item({
                name: req.body.itemName,
                quantity: parseInt(req.body.quantity),
                purchasePrice: parseInt(req.body.pp),
                sellPrice: parseInt(req.body.sp),
                category: req.body.category
            })
            store.items.push(newItem);
            try{
                await newItem.save();
            }catch{
                console.log("Item NOt saved");
                return res.json({ status: false });
            }
            const newEntry = new Entry({
                itemName: req.body.itemName,
                quantity: parseInt(req.body.quantity),
                purchasePrice: parseInt(req.body.pp),
                sellPrice: parseInt(req.body.sp),
                operation: "purchase",
                new: true
            });
            store.entries.push(newEntry);
            try{
                await newEntry.save()
            }catch{
                console.log("entry NOt saved");
                return res.json({ status: false });
            }
            await store.save().then(()=>{
                return res.json({ status: true});
            }).catch((err)=>{
                console.log("Store NOt saved");
                return res.json({status: false });
            })
          }
        }
      );
    } else {
      return res.json({ status: false });
    }
});


// Fetch all Items - /api/item/items
router.post("/items",  async(req,res)=>{
    const token = req.body.jwt;
    if (token) {
      jwt.verify(
        token,
        JWT_SECRET,
        async (err, decodedToken) => {
          if (err) {
            res.json({ status: false });
          } else {
            console.log(decodedToken);
            const store = await Store.findById(decodedToken.store.id).populate('items');
            if (store) res.json({ status: true,store: store, items:store.items  });
            else res.json({ status: false });
          }
        }
      );
    } else {
      res.json({ status: false });
    }
    // const store = await Store.findById(req.body.id).populate('items');
    // res.send(store.items);
})

// Edit item - /api/item/edit
router.post("/edit", async (req,res)=>{
    try{
      let item = await Item.findByIdAndUpdate(req.body.id, { ...req.body});
      res.json({status: true});
    }catch{
      res.json({status: false});
    }
})

// Delete Item - /api/item/delete
router.post('/delete', async (req,res)=>{
    const store_id = req.body.id;
    const itemId = req.body.iid;
    try{
      await Store.findByIdAndUpdate(store_id, { $pull: { items: itemId } });
      await Item.findByIdAndDelete(itemId);
      res.json({ status: true});
    }catch{
      res.json({status: false});
    }
})

module.exports = router