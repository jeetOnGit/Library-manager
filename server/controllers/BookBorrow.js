import QRCode from "qr";
import  Borrow from "../models/Borrow";

const borrowBook = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    const borrow = new Borrow({ user: userId, book: bookId });
    await borrow.save();

    // Generate QR code string with borrow._id
    const qrData = `${borrow._id}`;
    const qrImage = await QRCode.toDataURL(qrData);

    borrow.qrCode = qrData;
    await borrow.save();

    res.json({ message: "Borrow request created", qrImage, borrow });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

};

export { borrowBook }