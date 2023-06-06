import { Request, Response, NextFunction } from "express";
import { userModel } from '../DB/DBschemas'

export const getUserInfo = (req: Request, res: Response): void => {
    res.json({"hey": 1})
}

export const getTrades = async (req: Request, res: Response) => {
    
    try {
        const userData = await userModel.find({ name: "admin" }).select('trades');
        return res.status(200).json(userData);
    } catch {
        return res.status(500).json({ error: "server error" })
    }

}