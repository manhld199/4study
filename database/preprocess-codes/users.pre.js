import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import Papa from "papaparse";

// Đọc bản đồ course-id-map.json
const loadCourseIdMap = (mapFilePath) => {
  const rawData = fs.readFileSync(mapFilePath, "utf8");
  return JSON.parse(rawData);
};

// Hàm tạo email từ name_trans và id
const generateUserEmail = (nameTrans, oldId) => {
  if (nameTrans && oldId) {
    const emailPrefix = nameTrans.replace(/\s+/g, "").toLowerCase();
    return `${emailPrefix}.${oldId}@example.com`;
  }
};

// Hàm chuyển JSON
const parseJson = (str) => {
  if (str) {
    try {
      const formattedStr = str
        .replaceAll("'", '"')
        .replaceAll(" ", ",")
        .replaceAll("\n", "");
      return JSON.parse(formattedStr);
    } catch (error) {
      console.error("Lỗi khi parse:", error);
      return [];
    }
  }
};

// Hàm để đọc và ghi dữ liệu vào file JSON
async function readAndWriteJSON(
  inputFilePath,
  outputFilePath,
  courseIdMapPath,
  userIdMapPath
) {
  // Đọc dữ liệu từ user-course.csv
  const userCourseData = fs.readFileSync(inputFilePath, "utf-8");
  const userCourseRows = Papa.parse(userCourseData, { header: true }).data;

  // Lấy danh sách các user từ user-course.csv
  const userIdsInCourse = new Set(userCourseRows.map((row) => row.user));

  // Đọc dữ liệu từ user.csv
  const userData = fs.readFileSync(
    path.join(import.meta.dirname, "..", "raw-data", "user.csv"),
    "utf-8"
  );
  const userRows = Papa.parse(userData, { header: true }).data;

  // Lọc các user có user id nằm trong user-course.csv
  const filteredUsers = userRows.filter((row) => userIdsInCourse.has(row.id));

  // Đọc file course-id-map.json
  const courseIdMap = loadCourseIdMap(courseIdMapPath);

  // Khởi tạo object để lưu map user-id
  const userIdMap = {};

  // Lặp qua các user để xử lý và thêm vào map
  const processedUsers = await Promise.all(
    filteredUsers.map(async (user) => {
      // Tạo email cho user
      const email = generateUserEmail(user.name_trans, user.id);

      // Chuyển id thành ObjectId sử dụng Mongoose ObjectId
      const userId = new mongoose.Types.ObjectId(); // Giả sử sử dụng Mongoose ObjectId

      userIdMap[user.id] = userId;

      // Chuyển các khóa học trong course_order thành ObjectId
      const courseIds = (parseJson(user.course_order) ?? []).map(
        (course) => new mongoose.Types.ObjectId(courseIdMap[course] || course) // Chuyển course id thành ObjectId
      );

      // Chuyển enroll_time thành mảng
      const times = parseJson(user.enroll_time) ?? [];

      // Trả về dữ liệu đã xử lý với tên trường mới
      return courseIds && courseIds.length > 0
        ? {
            id: userId,
            user_name: user.name_trans,
            user_email: email,
            list_courses: courseIds.map((courseId, index) => ({
              enroll_time: times[index],
              course_id: courseId,
            })),
          }
        : {};
    })
  );

  // Ghi kết quả vào file JSON
  fs.writeFileSync(
    outputFilePath,
    JSON.stringify(processedUsers, null, 2),
    "utf-8"
  );

  // Lưu user-id-map.json
  fs.writeFileSync(userIdMapPath, JSON.stringify(userIdMap, null, 2), "utf-8");

  console.log(`Đã lưu kết quả vào file ${outputFilePath} và ${userIdMapPath}`);
}

// Gọi hàm readAndWriteJSON
readAndWriteJSON(
  path.join(import.meta.dirname, "..", "raw-data", "1000-user-course.csv"),
  path.join(import.meta.dirname, "..", "preprocessed-data", "user.json"),
  path.join(
    import.meta.dirname,
    "..",
    "preprocessed-data",
    "course-id-map.json"
  ),
  path.join(import.meta.dirname, "..", "preprocessed-data", "user-id-map.json")
);
