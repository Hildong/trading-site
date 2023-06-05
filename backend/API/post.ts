import { Request, Response, NextFunction } from "express";
import { IUser, userModel } from '../DB/DBschemas'

const defaultUserData = new userModel({
    name: "admin",
    portfolio: {
        fiat: 200000,
        btc: 0,
        eth: 0
    },
    trades: null
})

export const updateUserInfo = async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        const userExists = await userModel.findOne({name: req.body.name});
        if(userExists) {
            const updatedUser = await userModel.updateOne({name: req.body.name}, defaultUserData, {
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