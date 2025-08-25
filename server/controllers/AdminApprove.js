export const approveManually = async (req, res) => {
  try {
    const { borrowId } = req.body;

    const borrow = await Borrow.findById(borrowId).populate("book");
    if (!borrow) return res.status(404).json({ message: "Borrow not found" });

    if (borrow.status === "approved") {
      return res.status(400).json({ message: "Already approved" });
    }

    borrow.status = "approved";
    await borrow.save();

    borrow.book.availableCopies -= 1;
    await borrow.book.save();

    res.json({ message: "Borrow approved manually", borrow });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
