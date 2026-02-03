const mongoose = require("mongoose");
const Store = require("./models/ruit.models");

mongoose.connect("mongodb://127.0.0.1:27017/appstore");

const games = [
  { storeName:"GTA V", storeImage:"https://images.igdb.com/igdb/image/upload/t_cover_big/co1tmu.jpg", storePrice:2499 },
  { storeName:"Red Dead Redemption 2", storeImage:"https://images.igdb.com/igdb/image/upload/t_cover_big/co1q1f.jpg", storePrice:2999 },
  { storeName:"God of War", storeImage:"https://images.igdb.com/igdb/image/upload/t_cover_big/co1r7f.jpg", storePrice:1999 },
  { storeName:"Cyberpunk 2077", storeImage:"https://images.igdb.com/igdb/image/upload/t_cover_big/co2lbd.jpg", storePrice:1499 }
];

(async () => {
    await Store.insertMany(games);
    console.log("Games inserted");
    process.exit();
})();
