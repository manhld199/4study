import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import Papa from "papaparse";

// Hàm tải school-id-map.json
const loadSchoolIdMap = (mapFilePath) => {
  const rawData = fs.readFileSync(mapFilePath, "utf8");
  return JSON.parse(rawData);
};

// Hàm tải teacher-id-map.json
const loadTeacherIdMap = (mapFilePath) => {
  const rawData = fs.readFileSync(mapFilePath, "utf8");
  return JSON.parse(rawData);
};

// Hàm tải school-course.csv và tạo bản đồ course -> school
const loadCourseSchoolMap = (courseSchoolFilePath) => {
  const courseSchoolMap = {};
  const courseSchoolData = fs.readFileSync(courseSchoolFilePath, "utf8");
  const parsedData = Papa.parse(courseSchoolData, {
    header: true,
    skipEmptyLines: true,
  });

  parsedData.data.forEach((row) => {
    courseSchoolMap[row.course] = row.school;
  });

  return courseSchoolMap;
};

// Hàm tải teacher-course.csv và tạo bản đồ course -> teachers
const loadCourseTeacherMap = (teacherCourseFilePath, teacherIdMap) => {
  const courseTeacherMap = {};
  const teacherCourseData = fs.readFileSync(teacherCourseFilePath, "utf8");
  const parsedData = Papa.parse(teacherCourseData, {
    header: true,
    skipEmptyLines: true,
  });

  parsedData.data.forEach((row) => {
    const teacherId = teacherIdMap[row.teacher];
    if (teacherId) {
      if (!courseTeacherMap[row.course]) {
        courseTeacherMap[row.course] = [];
      }
      courseTeacherMap[row.course].push(teacherId);
    }
  });

  return courseTeacherMap;
};

async function readAndWriteJSON(inputFilePath, outputJSONPath, selectedFields) {
  const results = [];
  const idMap = {}; // Bản đồ giữa id cũ và id mới

  // Tải school-id-map, teacher-id-map, course-school map và course-teacher map
  const schoolIdMap = loadSchoolIdMap(
    path.join(
      import.meta.dirname,
      "..",
      "preprocessed-data",
      "school-id-map.json"
    )
  );
  const teacherIdMap = loadTeacherIdMap(
    path.join(
      import.meta.dirname,
      "..",
      "preprocessed-data",
      "teacher-id-map.json"
    )
  );
  const courseSchoolMap = loadCourseSchoolMap(
    path.join(import.meta.dirname, "..", "raw-data", "school-course.csv")
  );
  const courseTeacherMap = loadCourseTeacherMap(
    path.join(import.meta.dirname, "..", "raw-data", "teacher-course.csv"),
    teacherIdMap
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
        if (field === "about_trans") newField = "course_about";
        if (field === "name_trans") newField = "course_name";
        obj[newField] = data[field];
      }
      return obj;
    }, {});

    // Tạo ObjectId mới và thay thế id cũ
    const oldId = filteredData["id"];
    const newId = new mongoose.Types.ObjectId().toString();
    filteredData["id"] = newId;

    // Thêm trường school_id
    const schoolCode = courseSchoolMap[oldId];
    filteredData["school_id"] = schoolIdMap[schoolCode] || null;

    // Thêm mảng teachers
    filteredData["teachers"] = courseTeacherMap[oldId] || [];

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
    "course-id-map.json"
  );
  fs.writeFileSync(mapFilePath, JSON.stringify(idMap, null, 2), "utf8");
  console.log(`Bản đồ giữa id cũ và id mới đã được ghi vào ${mapFilePath}`);
}

const selectedFields = ["id", "name_trans", "about_trans"];

readAndWriteJSON(
  path.join(import.meta.dirname, "..", "raw-data", "course.csv"),
  path.join(import.meta.dirname, "..", "preprocessed-data", "course.json"),
  selectedFields
);
