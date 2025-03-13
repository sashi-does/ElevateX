import { Router } from "express";
import {getBookings, addBooking} from "../controllers/BookingController.js"; 

const BookingRouter = Router();

BookingRouter.get("/bookings", getBookings);
BookingRouter.post("/add-booking", addBooking);

export default BookingRouter;

