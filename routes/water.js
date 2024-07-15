import express from 'express'
import WaterController from '../controllers/water.js'

const router = express.Router()


router.get('/day', WaterController.getWaterRecordDaily)
router.get('/month', WaterController.getWaterRecordByMonth)
router.post('/', WaterController.addWaterOnDay)
router.put('/:id', WaterController.updateWaterStatus)
router.delete('/:id', WaterController.deleteWaterRecord)


export default router