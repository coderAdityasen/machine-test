import { dbconnect } from "../config/db.js";


export const createwallet = async (req,res)=>{
	try {
		const {user_id, currency} = req.body;

		if(!user_id) res.status(400).json({message : "user id is not define"})

		const [result] = await dbconnect.query(
			`insert into wallets(user_id, currency,status) values(?,?,'active')`,
			[user_id,currency]
		);
		console.log(result);

		res.status(201).json({message: "wallet created"})

	} catch (error) {
		console.log(error)
		res.status(400).json({message: "sometihng error"})
	}
}

export const walletdeposit = async(req,res)=>{
	try {
		console.log("wallet is running")
		const connection = await dbconnect.getConnection();

		const {wallet_id, amount, reference_id} = req.body;

		if(!wallet_id || !amount || !reference_id) res.status(400).json("all fields are required")
		await connection.beginTransaction()
		const [wallets] = await connection.query(
		`select * from wallets where id = ? FOR UPDATE`, [wallet_id]
		)

		const wallet = wallets[0];
		const balancebefore = wallet.balance;
		const newbalance = balancebefore + amount;

		 await connection.query(
			`update wallets SET balance = ? where id = ?` ,[newbalance,wallet_id]
		)
		await connection.query(
			`insert into wallet_transactions(wallet_id,reference_id,type,amount,balanceBefore, balanceAfter,description)
			values(?,?,'credit',?,?,?,?)
			`, [wallet_id,reference_id,amount,balancebefore,newbalance,"amount deposit"]
		)
		await connection.commit();
		connection.release();
		return res.status(200).json({message: "money deposits successfully"});
		
	} catch (error) {
		res.status(400).json({message: "deposit controller error"})
	}
}

export const getbalance = async (req,res)=>{
	try {
		const {wallet_id} = req.query;
		const [wallets] = await dbconnect.query(
			`select id, user_id, balance, currency, status FROM wallets WHERE id = ?`, [wallet_id]
		)

		const wallet = wallets[0];

		return res.status(200).json({message: "success", walletID: wallet.id, balance: wallet.balance, currency: wallet.currency});

	} catch (error) {
		console.log("error")
		res.status(400).json({message: "wallet controller failed"})
	}
}

export const transfermoney = async(req,res)=>{
	try {
		const connection =await dbconnect.getConnection();
		const {fromwalletid, towalletid, amount, reference_id} = req.body();

		const [wallets] = await connection.query(
			`select * from wallets WHERE id IN (? , ?) ORDER BY id FOR update`, [fromwalletid,towalletid]
		)
		if(wallets.length !== 2){
			await connection.rollback();
			return res.status(404).json({message: "more than two wallets are required"})
		}

		const sender = wallets.find((wallet)=>wallet.id == fromwalletid)
		const receiver = wallets.find((wallet)=>wallet.id == towalletid)

		
	} catch (error) {
		res.status(404).json({message: "transfer controller error"})
	}
}