interface Teacher {
  _id: string; 
  teacher_name: string;
  teacher_img: string; 
  teacher_about: string; 
}

interface Course {
  _id: string;
  course_name: string; 
  course_img: string; 
  course_about: string; 
  course_videos: string[]; 
  teachers: Teacher[];
}

export const courses: Course = {
  _id: "abc",
  course_name: "JavaScript Basics",
  course_img:
    "https://thepet.vn/wp-content/uploads/2023/05/angry_cat_2-scaled-1-1024x683.webp",
  course_about: "Learn the fundamentals of JavaScript programming.",
  course_videos: [
    "https://example.com/videos/js-basics/intro.mp4",
    "https://example.com/videos/js-basics/syntax.mp4",
    "https://example.com/videos/js-basics/syntax.mp4",
    "https://example.com/videos/js-basics/syntax.mp4",
    "https://example.com/videos/js-basics/syntax.mp4",
    "https://www.youtube.com/watch?v=W6NZfCO5SIk&pp=ygUIY291c2UganM%3D",
  ],
  teachers: [
    {
      _id: "1",
      teacher_name: "Alice Johnson",
      teacher_img:
        "https://thepet.vn/wp-content/uploads/2023/05/angry_cat_2-scaled-1-1024x683.webp",
      teacher_about: "Expert in JavaScript and web development.",
    },
    {
      _id: "2",
      teacher_name: "Bob Smith",
      teacher_img:
        "https://thepet.vn/wp-content/uploads/2023/05/angry_cat_2-scaled-1-1024x683.webp",
      teacher_about: "Specializes in digital marketing and SEO.",
    },
  ],
};