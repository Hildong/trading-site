import { Request, Response, NextFunction } from "express";
import { userModel } from '../DB/DBschemas'

export const getUserInfo = async (req: Request, res: Response) => {
    try {
        const userData = await userModel.findOne({name: "admin"}).select("portfolio.fiat");
        return res.json(userData?.portfolio.fiat)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
}

export const getTrades = async (req: Request, res: Response) => {
    
    try {
        const userData = await userModel.find({ name: "admin" }).select('trades');
        return res.status(200).json(userData);
    } catch {
        return res.status(500).json({ error: "server error" })
    }

}