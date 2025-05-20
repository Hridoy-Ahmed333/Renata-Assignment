const {
  readExcelData,
  writeExcelData,
  updateExcelEntry,
  deleteExcelEntry,
} = require("./excelController");

exports.getData = (req, res) => {
  try {
    const data = readExcelData();
    res.json(data);
  } catch (err) {
    console.error("Error reading Excel file:", err);
    res.status(500).json({ error: "Failed to read Excel file" });
  }
};

exports.postData = (req, res) => {
  try {
    let newData = req.body;
    if (!Array.isArray(newData)) newData = [newData];
    writeExcelData(newData);
    res.json({ message: "Excel data updated successfully" });
  } catch (err) {
    console.error("Error writing Excel file:", err);
    res.status(500).json({ error: "Failed to write Excel file" });
  }
};

exports.putData = (req, res) => {
  try {
    const id = req.params.id;
    const updatedFields = req.body;
    const result = updateExcelEntry(id, updatedFields);
    if (!result.success) return res.status(404).json({ error: result.message });

    res.json({
      message: "Entry updated successfully",
      updatedEntry: result.updatedEntry,
    });
  } catch (err) {
    console.error("Error updating Excel file:", err);
    res.status(500).json({ error: "Failed to update Excel file" });
  }
};

exports.deleteData = (req, res) => {
  try {
    const id = req.params.id;
    const result = deleteExcelEntry(id);
    if (!result.success)
      return res.status(404).json({ error: "Entry not found" });

    res.json({ message: "Entry deleted successfully" });
  } catch (err) {
    console.error("Error deleting Excel file:", err);
    res.status(500).json({ error: "Failed to delete Excel file" });
  }
};
