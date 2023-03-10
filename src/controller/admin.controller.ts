import { Request, Response } from "express";
import { IAdmin } from "../model/admin.model";

export const register = async(req:Request,res:Response)=>{
    const data = req.body as IAdmin
    const {fname,lname,email,gender,password} = data
    
}