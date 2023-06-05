import { Request, Response, NextFunction } from "express";

export const getUserInfo = (req: Request, res: Response): void => {
    res.json({"hey": 1})
}