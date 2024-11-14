import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import Papa from "papaparse";

// Hàm tải school-id-map.json
const loadSchoolIdMap = (mapFilePath) => {
  const rawData = fs.readFileSync(mapFilePath, "utf8");
  return JSON.parse(rawData);
};

// Hàm tải teacher-school.csv và tạo một bản đồ teacher -> school
const loadTeacherSchoolMap = (teacherSchoolFilePath) => {
  const teacherSchoolMap = {};
  const teacherSchoolData = fs.readFileSync(teacherSchoolFilePath, "utf8");
  const parsedData = Papa.parse(teacherSchoolData, {
    header: true,
    skipEmptyLines: true,
  });

  parsedData.data.forEach((row) => {
    teacherSchoolMap[row.teacher] = row.school;
  });

  return teacherSchoolMap;
};

async function readAndWriteJSON(inputFilePath, outputJSONPath, selectedFields) {
  const results = [];
  const idMap = {}; // Bản đồ giữa id cũ và id mới

  // Tải school-id-map và teacher-school map
  const schoolIdMap = loadSchoolIdMap(
    path.join(
      import.meta.dirname,
      "..",
      "preprocessed-data",
      "school-id-map.json"
    )
  );
  const teacherSchoolMap = loadTeacherSchoolMap(
    path.join(import.meta.dirname, "..", "raw-data", "teacher-school.csv")
  );

  // Đọc dữ liệu từ file CSV đầu vào
  const inputCSV = fs.readFileSync(inputFilePath, "utf8");

  // Parse CSV dữ liệu với PapaParse
  const parsedData = Papa.parse(inputCSV, {
    header: true,
    skipEmptyLines: true,
  });

  parsedData.data.forEach((data) => {
    // Tạo một đối tượng với các trường đã đổi tên
    const filteredData = selectedFields.reduce((obj, field) => {
      if (data[field] !== undefined) {
        let newField = field;
        if (field === "about_trans") newField = "teacher_about";
        if (field === "name_trans") newField = "teacher_name";
        obj[newField] = data[field];
      }
      return obj;
    }, {});

    // Tạo ObjectId mới và thay thế id cũ
    const oldId = filteredData["id"];
    const newId = new mongoose.Types.ObjectId().toString();
    filteredData["id"] = newId;

    // Thêm trường school_id
    const schoolCode = teacherSchoolMap[oldId];
    filteredData["school_id"] = schoolIdMap[schoolCode] || null;

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
    "teacher-id-map.json"
  );
  fs.writeFileSync(mapFilePath, JSON.stringify(idMap, null, 2), "utf8");
  console.log(`Bản đồ giữa id cũ và id mới đã được ghi vào ${mapFilePath}`);
}

const selectedFields = ["id", "name_trans", "about_trans"];

readAndWriteJSON(
  path.join(import.meta.dirname, "..", "raw-data", "teacher.csv"),
  path.join(import.meta.dirname, "..", "preprocessed-data", "teacher.json"),
  selectedFields
);
