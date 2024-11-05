export const course= {
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

interface Teacher {
  _id: string;
  teacher_name: string;
  teacher_img: string;
  teacher_about: string;
}

interface School {
  _id: string;
  school_name: string;
  school_img: string;
  school_about: string;
}

interface Course {
  _id: string;
  course_name: string;
  course_img: string;
  course_about: string;
  course_videos: string[];
  school: School;
  teachers: Teacher[];
  rank_popular: number;
  rank_personalized: number;
}

export const courses: Course[] = [
  {
    _id: "abc",
    course_name: "JavaScript Basics",
    course_img:
      "https://thepet.vn/wp-content/uploads/2023/05/angry_cat_2-scaled-1-1024x683.webp",
    course_about: "Learn the fundamentals of JavaScript programming.",
    course_videos: [
      "https://example.com/videos/js-basics/intro.mp4",
      "https://example.com/videos/js-basics/syntax.mp4",
    ],
    school: {
      _id: "1",
      school_name: "Tech Academy",
      school_img:
        "https://thepet.vn/wp-content/uploads/2023/05/angry_cat_2-scaled-1-1024x683.webp",
      school_about: "A leading academy for technology and programming courses.",
    },
    teachers: [
      {
        _id: "1",
        teacher_name: "Alice Johnson",
        teacher_img:
          "https://thepet.vn/wp-content/uploads/2023/05/angry_cat_2-scaled-1-1024x683.webp",
        teacher_about: "Expert in JavaScript and web development.",
      },
      {
        _id: "1",
        teacher_name: "Alice Johnson",
        teacher_img:
          "https://thepet.vn/wp-content/uploads/2023/05/angry_cat_2-scaled-1-1024x683.webp",
        teacher_about: "Expert in JavaScript and web development.",
      },
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
    rank_popular: 4,
    rank_personalized: 8,
  },
  {
    _id: "abc",
    course_name: "Advanced React",
    course_img:
      "https://thepet.vn/wp-content/uploads/2023/05/angry_cat_2-scaled-1-1024x683.webp",
    course_about: "Deep dive into React for building complex applications.",
    course_videos: [
      "https://example.com/videos/react-advanced/hooks.mp4",
      "https://example.com/videos/react-advanced/context.mp4",
    ],
    school: {
      _id: "1",
      school_name: "Tech Academy",
      school_img:
        "https://thepet.vn/wp-content/uploads/2023/05/angry_cat_2-scaled-1-1024x683.webp",
      school_about: "A leading academy for technology and programming courses.",
    },
    teachers: [
      {
        _id: "3",
        teacher_name: "Charlie Brown",
        teacher_img:
          "https://thepet.vn/wp-content/uploads/2023/05/angry_cat_2-scaled-1-1024x683.webp",
        teacher_about: "Data science and machine learning enthusiast.",
      },
    ],
    rank_popular: 3,
    rank_personalized: 11,
  },
  {
    _id: "abc",
    course_name: "Data Science with Python",
    course_img:
      "https://thepet.vn/wp-content/uploads/2023/05/angry_cat_2-scaled-1-1024x683.webp",
    course_about: "Explore data science concepts using Python.",
    course_videos: [
      "https://example.com/videos/python-data-science/introduction.mp4",
    ],
    school: {
      _id: "2",
      school_name: "Data Science Institute",
      school_img:
        "https://thepet.vn/wp-content/uploads/2023/05/angry_cat_2-scaled-1-1024x683.webp",
      school_about: "Focuses on data science and analytics education.",
    },
    teachers: [
      {
        _id: "2",
        teacher_name: "Bob Smith",
        teacher_img:
          "https://thepet.vn/wp-content/uploads/2023/05/angry_cat_2-scaled-1-1024x683.webp",
        teacher_about: "Specializes in digital marketing and SEO.",
      },
    ],
    rank_popular: 2,
    rank_personalized: 88,
  },
  {
    _id: "abc",
    course_name: "Machine Learning 101",
    course_img:
      "https://thepet.vn/wp-content/uploads/2023/05/angry_cat_2-scaled-1-1024x683.webp",
    course_about:
      "Get started with machine learning algorithms and techniques.",
    course_videos: ["https://example.com/videos/ml-101/intro.mp4"],
    school: {
      _id: "2",
      school_name: "Data Science Institute",
      school_img:
        "https://thepet.vn/wp-content/uploads/2023/05/angry_cat_2-scaled-1-1024x683.webp",
      school_about: "Focuses on data science and analytics education.",
    },
    teachers: [
      {
        _id: "4",
        teacher_name: "Ian Somerhalder",
        teacher_img:
          "https://thepet.vn/wp-content/uploads/2023/05/angry_cat_2-scaled-1-1024x683.webp",
        teacher_about: "Experienced educator in cloud computing.",
      },
    ],
    rank_popular: 6,
    rank_personalized: 23,
  },
  {
    _id: "abc",
    course_name: "Web Development Bootcamp",
    course_img:
      "https://thepet.vn/wp-content/uploads/2023/05/angry_cat_2-scaled-1-1024x683.webp",
    course_about: "Comprehensive bootcamp covering HTML, CSS, and JavaScript.",
    course_videos: ["https://example.com/videos/web-dev-bootcamp/overview.mp4"],
    school: {
      _id: "3",
      school_name: "Web Development Bootcamp",
      school_img:
        "https://thepet.vn/wp-content/uploads/2023/05/angry_cat_2-scaled-1-1024x683.webp",
      school_about: "Intensive training for aspiring web developers.",
    },
    teachers: [
      {
        _id: "5",
        teacher_name: "Fiona Gallagher",
        teacher_img:
          "https://thepet.vn/wp-content/uploads/2023/05/angry_cat_2-scaled-1-1024x683.webp",
        teacher_about: "Web developer with a passion for React.",
      },
    ],
    rank_popular: 12,
    rank_personalized: 1,
  },
  {
    _id: "abc",
    course_name: "Introduction to Node.js",
    course_img:
      "https://thepet.vn/wp-content/uploads/2023/05/angry_cat_2-scaled-1-1024x683.webp",
    course_about: "Learn how to build scalable applications with Node.js.",
    course_videos: ["https://example.com/videos/nodejs-intro/setup.mp4"],
    school: {
      _id: "1",
      school_name: "Tech Academy",
      school_img:
        "https://thepet.vn/wp-content/uploads/2023/05/angry_cat_2-scaled-1-1024x683.webp",
      school_about: "A leading academy for technology and programming courses.",
    },
    teachers: [
      {
        _id: "6",
        teacher_name: "George Clooney",
        teacher_img:
          "https://thepet.vn/wp-content/uploads/2023/05/angry_cat_2-scaled-1-1024x683.webp",
        teacher_about: "Digital marketer specializing in content creation.",
      },
    ],
    rank_popular: 7,
    rank_personalized: 5,
  },
  {
    _id: "abc",
    course_name: "React Native Fundamentals",
    course_img:
      "https://thepet.vn/wp-content/uploads/2023/05/angry_cat_2-scaled-1-1024x683.webp",
    course_about: "Learn to build mobile applications with React Native.",
    course_videos: ["https://example.com/videos/react-native/fundamentals.mp4"],
    school: {
      _id: "1",
      school_name: "Tech Academy",
      school_img:
        "https://thepet.vn/wp-content/uploads/2023/05/angry_cat_2-scaled-1-1024x683.webp",
      school_about: "A leading academy for technology and programming courses.",
    },
    teachers: [
      {
        _id: "7",
        teacher_name: "Julia Roberts",
        teacher_img:
          "https://thepet.vn/wp-content/uploads/2023/05/angry_cat_2-scaled-1-1024x683.webp",
        teacher_about: "Creative writer and educator in the arts.",
      },
    ],
    rank_popular: 1,
    rank_personalized: 1,
  },
  {
    _id: "abc",
    course_name: "CSS Flexbox & Grid",
    course_img:
      "https://thepet.vn/wp-content/uploads/2023/05/angry_cat_2-scaled-1-1024x683.webp",
    course_about: "Master CSS Flexbox and Grid layout techniques.",
    course_videos: [
      "https://example.com/videos/css-flexbox-grid/introduction.mp4",
    ],
    school: {
      _id: "3",
      school_name: "Web Development Bootcamp",
      school_img:
        "https://thepet.vn/wp-content/uploads/2023/05/angry_cat_2-scaled-1-1024x683.webp",
      school_about: "Intensive training for aspiring web developers.",
    },
    teachers: [
      {
        _id: "4",
        teacher_name: "Ian Somerhalder",
        teacher_img:
          "https://thepet.vn/wp-content/uploads/2023/05/angry_cat_2-scaled-1-1024x683.webp",
        teacher_about: "Experienced educator in cloud computing.",
      },
    ],
    rank_popular: 8,
    rank_personalized: 8,
  },
  {
    _id: "abc",
    course_name: "SQL for Beginners",
    course_img:
      "https://thepet.vn/wp-content/uploads/2023/05/angry_cat_2-scaled-1-1024x683.webp",
    course_about: "Learn SQL basics to manage databases effectively.",
    course_videos: ["https://example.com/videos/sql-beginners/intro.mp4"],
    school: {
      _id: "1",
      school_name: "Tech Academy",
      school_img:
        "https://thepet.vn/wp-content/uploads/2023/05/angry_cat_2-scaled-1-1024x683.webp",
      school_about: "A leading academy for technology and programming courses.",
    },
    teachers: [
      {
        _id: "3",
        teacher_name: "Charlie Brown",
        teacher_img:
          "https://thepet.vn/wp-content/uploads/2023/05/angry_cat_2-scaled-1-1024x683.webp",
        teacher_about: "Data science and machine learning enthusiast.",
      },
    ],
    rank_popular: 9,
    rank_personalized: 19,
  },
  {
    _id: "abc",
    course_name: "Digital Marketing Masterclass",
    course_img:
      "https://thepet.vn/wp-content/uploads/2023/05/angry_cat_2-scaled-1-1024x683.webp",
    course_about: "Understand digital marketing strategies and tools.",
    course_videos: [
      "https://example.com/videos/digital-marketing/overview.mp4",
    ],
    school: {
      _id: "4",
      school_name: "Business Institute",
      school_img:
        "https://thepet.vn/wp-content/uploads/2023/05/angry_cat_2-scaled-1-1024x683.webp",
      school_about: "Offers various business and management programs.",
    },
    teachers: [
      {
        _id: "8",
        teacher_name: "Diana Prince",
        teacher_img:
          "https://thepet.vn/wp-content/uploads/2023/05/angry_cat_2-scaled-1-1024x683.webp",
        teacher_about: "Professional graphic designer and illustrator.",
      },
    ],
    rank_popular: 23,
    rank_personalized: 22,
  },
  {
    _id: "abc",
    course_name: "Full Stack Development",
    course_img:
      "https://thepet.vn/wp-content/uploads/2023/05/angry_cat_2-scaled-1-1024x683.webp",
    course_about: "Learn to build complete web applications from scratch.",
    course_videos: ["https://example.com/videos/full-stack/overview.mp4"],
    school: {
      _id: "3",
      school_name: "Web Development Bootcamp",
      school_img:
        "https://thepet.vn/wp-content/uploads/2023/05/angry_cat_2-scaled-1-1024x683.webp",
      school_about: "Intensive training for aspiring web developers.",
    },
    teachers: [
      {
        _id: "5",
        teacher_name: "Fiona Gallagher",
        teacher_img:
          "https://thepet.vn/wp-content/uploads/2023/05/angry_cat_2-scaled-1-1024x683.webp",
        teacher_about: "Web developer with a passion for React.",
      },
    ],
    rank_popular: 12,
    rank_personalized: 14,
  },
];