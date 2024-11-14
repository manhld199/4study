import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import Papa from "papaparse";

async function readAndWriteJSON(inputFilePath, outputJSONPath, selectedFields) {
  const results = [];
  const idMap = {}; // Bản đồ giữa id cũ và id mới

  // Đọc dữ liệu từ file CSV đầu vào
  const inputCSV = fs.readFileSync(inputFilePath, "utf8");

  // Parse CSV dữ liệu với PapaParse
  const parsedData = Papa.parse(inputCSV, {
    header: true, // Đọc header
    skipEmptyLines: true, // Bỏ qua các dòng trống
  });

  parsedData.data.forEach((data) => {
    // Tạo một đối tượng với các trường đã đổi tên
    const filteredData = selectedFields.reduce((obj, field) => {
      if (data[field] !== undefined) {
        let newField = field;
        if (field === "about_trans") newField = "school_about";
        if (field === "name_trans") newField = "school_name";
        obj[newField] = data[field];
      }
      return obj;
    }, {});

    // Tạo ObjectId mới và thay thế id cũ
    const oldId = filteredData["id"];
    const newId = new mongoose.Types.ObjectId().toString();
    filteredData["id"] = newId;

    // Lưu vào bản đồ id cũ và id mới
    idMap[oldId] = newId;

    results.push(filteredData);
  });

  // Ghi dữ liệu đã thay đổi vào file JSON
  fs.writeFileSync(outputJSONPath, JSON.stringify(results, null, 2), "utf8");
  console.log(`Dữ liệu đã được ghi vào ${outputJSONPath}`);

  // Ghi bản đồ giữa id cũ và id mới vào file JSON
  const mapFilePath = path.join(
    path.dirname(outputJSONPath),
    "school-id-map.json"
  );
  fs.writeFileSync(mapFilePath, JSON.stringify(idMap, null, 2), "utf8");
  console.log(`Bản đồ giữa id cũ và id mới đã được ghi vào ${mapFilePath}`);
}

const selectedFields = ["id", "name_trans", "about_trans"];

readAndWriteJSON(
  path.join(import.meta.dirname, "..", "raw-data", "school.csv"),
  path.join(import.meta.dirname, "..", "preprocessed-data", "school.json"),
  selectedFields
);
