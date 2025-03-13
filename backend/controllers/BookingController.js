import sql from "../config/db.js"

const getBookings = async (req,res) => {
    try {
        const bookings = await sql`SELECT * FROM bookings`;
        res.send({bookings});
    } catch (err) {
        console.error("Error fetching bookings:", err);
        res.send({message: err.message});
    }
}

const addBooking = async (req,res) => {
    try {
        const { name, email, meetingTime, phone } = req.body;
        await sql`INSERT INTO bookings (name, email, phone, meeting_time, status) VALUES 
        (${name}, ${email}, ${phone}, ${meetingTime}, 'pending')`;
        res.send({success: true, message: "Booking added successfully"});
    } catch (err) {
        console.error("Error adding booking:", err);
        res.send({success: false, message: err.message});
    }
}

export {getBookings, addBooking};