import { Router } from "express";
import { createwallet, getbalance, walletdeposit } from "../controller/wallet.controller.js";

const walletroute = Router();

walletroute.post("/", createwallet)
walletroute.post('/deposit', walletdeposit)
walletroute.get('/balance', getbalance)
export default walletroute;