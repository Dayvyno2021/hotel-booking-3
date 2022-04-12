import {admin, protect} from '../middleware/authMiddleware.js'
import formidableMiddleware from 'express-formidable'
import express from 'express'
const router = express.Router()
import { 
  allHotels, 
  createHotel, 
  deleteHotelAdmin, 
  image, 
  sellerHotels,
  singleHotel,
  updateHotel
} from '../controllers/hotelControllers.js'



router.route('/create-hotel').post(protect, formidableMiddleware(), createHotel)
router.route('/hotels').get(allHotels)
router.route('/hotel/image/:hotelId').get(image)
router.route('/seller-hotels').get(protect, sellerHotels)
router.route('/hotel/delete/:id').delete(protect, admin, deleteHotelAdmin)
router.route('/hotel/:hotelId').get(singleHotel)
router.route('/edit/hotel/:id').put(protect, formidableMiddleware(), updateHotel)

export default router