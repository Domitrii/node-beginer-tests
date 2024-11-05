import mongoose, { isValidObjectId } from 'mongoose'
import Water from '../modules/contactModule.js'
import { createWaterSchema, updateWaterSchema } from '../schemas/waterSchemas.js'
import HttpError from '../helpers/HttpError.js'

async function getWaterRecordDaily (req, res, next) {
    try {
        const date = new Date();
        const recentYear = date.getFullYear();
        const recentMonth = (date.getMonth() + 1).toString().padStart(2, "0");
        const recentDay = date.getDate().toString().padStart(2, "0");
        const today = `${recentYear}-${recentMonth}-${recentDay}`;
    
        const { day = today } = req.query;

        const data = await Water.find({ owner: req.user.id });
        const filter = data.filter((el) => el.time.includes(day));
        const waterAmount = filter.reduce((acc, el) => (acc += el.amount), 0);
    
        res.status(200).json({ data: filter, waterAmount });
      } catch (error) {
        next(error);
      }
}


async function addWaterOnDay(req, res, next){ 
    try {
        const {error} = createWaterSchema.validate(req.body)
        if(error){
            throw HttpError( 400, error.message)
        }
        const recordWater = await Water.create({
            ...req.body,
            owner: req.user.id
        })
        console.log(recordWater)
        res.status(201).send(recordWater)
    } catch (error){
        next(error)
    }
}

async function getWaterRecordByMonth(req, res, next){
    try{
        const date = new Date()
        const recentYear = date.getFullYear()
        const recentMonth = (date.getMonth() + 1).toString().padStart(2,"0")
        const monthStr = (`${recentYear} - ${recentMonth}`)

        const {month = monthStr} = req.query

        const water = await Water.find({owner: req.user.id})
        const waterRecord = water.filter(w => w.date === month)
        res.status(201).send(waterRecord)
    } catch (error){
        next(error)
    }
}

async function deleteWaterRecord(req, res, next){
    try{
        console.log(req.params)
        console.log(req.user)
        const {id} = req.params
        console.log(id)
        if(!isValidObjectId(id)) throw HttpError(401, "We can't find this id")
        const water = await Water.findByIdAndDelete({_id: id, owner: req.user.id})
        if(!water) throw HttpError(401, "We can't find this id on your account")
        res.status(200).send("All fine")
    } catch (error){
        next(error)
    }
}

async function updateWaterStatus(req, res, next){
    try{
        const {id} = req.params;
        console.log(id)
        if(!isValidObjectId(id)) throw HttpError(401, "We cannot find this id") 
        const {error} =  updateWaterSchema.validate(req.body)
        if(error) throw HttpError(400, error.message)
        const water = await Water.findByIdAndUpdate(id, req.body, {new: true})
        if(!water) throw HttpError(401, "We cannot find this id")
        res.status(200).send(water)
    } catch (error){
        next(error)
    }
}

export default {
    addWaterOnDay,
    getWaterRecordDaily,
    getWaterRecordByMonth,
    deleteWaterRecord,
    updateWaterStatus
}