import { Request, Response, NextFunction } from "express";
import { IUser, userModel } from '../DB/DBschemas'
import { Types } from "mongoose";

const defaultUserData = new userModel({
    name: "admin",
    portfolio: {
        fiat: 200000,
        btc: 0,
        eth: 0
    },
    trades: []
})

export const updateUserInfo = async (req: Request, res: Response) => {
    try {
        const userExists = await userModel.findOne({name: req.body.name});
        if(userExists) {
            const updatedUser = await userModel.findOneAndUpdate({name: req.body.name}, req.body, {
                new: true
            });
            return res.json(updatedUser);      
        } else {
          try {
            const savedUser = await defaultUserData.save();
            return res.json(savedUser)
          } catch (error) {
            console.error(error)
            return res.status(500).json({error: "Server error"})
          }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
}

export const buyCrypto = async (req: Request, res: Response) => {
    try {
        let btc: Number, eth: Number;

        if(req.body.quote === "btc") {
            btc = req.body.volume;
            eth = 0;
        } else {
            btc = 0;
            eth = req.body.volume;
        }

        const userData = await userModel.find({ name: req.body.name })

        if (userData[0].portfolio.fiat < req.body.price) return res.status(400).json({ error: "insufficient fiat balance"})

        const newPortfolioData = {
            portfolio: {
                fiat: userData[0].portfolio.fiat.valueOf() - req.body.price,
                btc: userData[0].portfolio.btc.valueOf() + btc.valueOf(),
                eth: userData[0].portfolio.btc.valueOf() + eth.valueOf()
            }
        }
        const newTradeData = {
            trades: {
                userID: new Types.ObjectId(),
                base: "USD",
                quote: req.body.quote,
                action: "buy",
                price: req.body.price,
                volume: req.body.volume
            }
        }
        const updatedUser = await userModel.findOneAndUpdate({name: req.body.name}, { $set: newPortfolioData, $push: newTradeData }, {
            new: true
        });
        console.log(updatedUser)
        return res.json(updatedUser); 
    } catch {
        return res.status(500).json({ error: 'Server error' });
    }
}

export const sellCrypto = async (req: Request, res: Response) => {
    try {
        let btc: Number, eth: Number;

        const userData = await userModel.find({ name: req.body.name })

        if(req.body.quote === "btc") {
            btc = req.body.volume;
            eth = 0;
            if (userData[0].portfolio.btc < req.body.volume) return res.status(400).json({ error: "insufficient amount" })
        } else {
            btc = 0;
            eth = req.body.volume;
            if (userData[0].portfolio.eth < req.body.volume) return res.status(400).json({ error: "insufficient amount" })
        }

        const newPortfolioData = {
            portfolio: {
                fiat: userData[0].portfolio.fiat.valueOf() + req.body.price,
                btc: userData[0].portfolio.btc.valueOf() - btc.valueOf(),
                eth: userData[0].portfolio.btc.valueOf() - eth.valueOf()
            }
        }
        const newTradeData = {
            trades: {
                userID: new Types.ObjectId(),
                base: "USD",
                quote: req.body.quote,
                action: "sell",
                price: req.body.price,
                volume: req.body.volume
            }
        }
        const updatedUser = await userModel.findOneAndUpdate({name: req.body.name}, { $set: newPortfolioData, $push: newTradeData }, {
            new: true
        });
        console.log(updatedUser)
        return res.json(updatedUser); 
    } catch {
        return res.status(500).json({ error: 'Server error' });
    }
}