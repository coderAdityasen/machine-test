import "dotenv/config"
import express from "express"
import walletroute from "./src/routes/wallet.routes.js";

const app = express();


app.use(express.json());

app.get("/", (req,res)=>{
	res.json({message: "api is working"})
})

app.use("/wallet", walletroute)

app.listen(3005,()=>{
	console.log(`server is running`);
})


