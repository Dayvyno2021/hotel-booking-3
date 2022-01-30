import express from "express";
import { 
  createConnectAccount, 
  getAccountBalance, 
  getAccountStatus,
  stripeSession,
  updateSellersAccount,
  stripeSuccessPayment, 
  userhotelBookings, 
  alreadyBooked
} from "../controllers/stripeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


router.route('/create-connect-account').post(protect, createConnectAccount)
router.route('/get-account-status').post(protect, getAccountStatus)
router.route('/get-account-balance').post(protect, getAccountBalance)
router.route('/stripe-session').post(protect, stripeSession)
router.route('/stripe-session-payment/:hotelId').get(protect, updateSellersAccount)
router.route('/stripe-success-payment/:hotelId').post(protect, stripeSuccessPayment)
// We equally used here for order routes
router.route('/user-hotel-bookings').get(protect, userhotelBookings)
router.route('/is-already-booked/:hotelId').get(protect, alreadyBooked)


export default router