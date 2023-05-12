const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const Store = require("./models/store")
const Entry = require("./models/entry")
const Item = require("./models/item")

// module.exports.fetchStore = (req,res,next)=>{
//     // fetch user from jwt token and append user id to req object
//     const token = req.cookies.jwt;
//     if(!token){
//         res.status = false;
//         next();
//     }
//     try{
//         const data = jwt.verify(token, JWT_SECRET);
//         res.store = data.store;
//         next();
//     }catch(err){
//         res.status = false;
//         next();
//     }
// }
module.exports.fetchStore = (req, res, next) => {
    const token = req.body.jwt;
    if (token) {
      jwt.verify(
        token,
        JWT_SECRET,
        async (err, decodedToken) => {
          if (err) {
            res.json({ status: false });
            next();
          } else {
            // console.log(decodedToken);
            const store = await Store.findById(decodedToken.store.id).populate("entries");
            if (store){
              let sales=0,earning=0;
              for(let entry of store.entries){
                  if(entry.operation==="sell"){
                    sales+=(entry.sellPrice * entry.quantity);
                    earning +=(entry.sellPrice-entry.purchasePrice)*entry.quantity
                  }
              }
              // const entries = await Entry.find({createdAt: {$lt: new Date(), $gt: new Date(new Date().getTime()-(24*60*60*1000*30))}});
              let msales=0,mearning=0;
              for(let entry of store.entries){
                  if(entry.operation==="sell"){
                    if(entry.createdAt < new Date() && entry.createdAt > new Date(new Date().getTime()-(24*60*60*1000*30))){
                      msales+=(entry.sellPrice * entry.quantity);
                      mearning +=(entry.sellPrice-entry.purchasePrice)*entry.quantity;
                    }
                  }
              }
              const store1 = await Store.findById(decodedToken.store.id).populate("items");
              let outStock = 0;
              for(let i of store1.items){
                if(i.quantity===0){
                  outStock++;
                }
              }
              const calc = {
                sales: sales,
                earning: earning,
                msales: msales,
                mearning: mearning,
                outStock: outStock
              }
              res.json({ status: true, store: store,calc: calc });
            }
            else res.json({ status: false });
            next();
          }
        }
      );
    } else {
      res.json({ status: false });
      next();
    }
  };