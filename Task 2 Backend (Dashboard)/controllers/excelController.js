const XLSX = require("xlsx");
const path = require("path");

const EXCEL_FILE_PATH = path.join(__dirname, "../data/data.xlsx");
const SHEET_NAME = "Task 2";

function readExcelData() {
  const workbook = XLSX.readFile(EXCEL_FILE_PATH);
  const worksheet = workbook.Sheets[SHEET_NAME];
  return XLSX.utils.sheet_to_json(worksheet);
}

function writeExcelData(newEntries) {
  const workbook = XLSX.readFile(EXCEL_FILE_PATH);
  const worksheet = workbook.Sheets[SHEET_NAME];
  let existingData = worksheet ? XLSX.utils.sheet_to_json(worksheet) : [];
  const updatedData = existingData.concat(newEntries);
  const newWorksheet = XLSX.utils.json_to_sheet(updatedData);
  workbook.Sheets[SHEET_NAME] = newWorksheet;
  XLSX.writeFile(workbook, EXCEL_FILE_PATH);
}

function updateExcelEntry(id, updatedFields) {
  const workbook = XLSX.readFile(EXCEL_FILE_PATH);
  const worksheet = workbook.Sheets[SHEET_NAME];
  let data = worksheet ? XLSX.utils.sheet_to_json(worksheet) : [];
  const index = data.findIndex((entry) => entry.ID === id);
  if (index === -1) return { success: false, message: "Entry not found" };
  data[index] = { ...data[index], ...updatedFields };
  const newWorksheet = XLSX.utils.json_to_sheet(data);
  workbook.Sheets[SHEET_NAME] = newWorksheet;
  XLSX.writeFile(workbook, EXCEL_FILE_PATH);
  return { success: true, updatedEntry: data[index] };
}

function deleteExcelEntry(id) {
  const workbook = XLSX.readFile(EXCEL_FILE_PATH);
  const worksheet = workbook.Sheets[SHEET_NAME];
  const data = worksheet ? XLSX.utils.sheet_to_json(worksheet) : [];
  const updatedData = data.filter((item) => item.ID !== id);
  if (updatedData.length === data.length) return { success: false };
  const newWorksheet = XLSX.utils.json_to_sheet(updatedData);
  workbook.Sheets[SHEET_NAME] = newWorksheet;
  XLSX.writeFile(workbook, EXCEL_FILE_PATH);
  return { success: true };
}

module.exports = {
  readExcelData,
  writeExcelData,
  updateExcelEntry,
  deleteExcelEntry,
};
