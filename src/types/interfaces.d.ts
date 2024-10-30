interface IOkResponseProps {
  message?: string;
  data?: any;
}

interface INotOkResponseProps {
  message?: string;
  error?: Error | string | undefined;
}

interface IBaseResponseProps {
  message: string;
  status: EResponseStatus;
  data?: IResponseData;
  error?: Error | string;
}

interface Teacher {
  teacher_name: string;
  teacher_img: string;
  teacher_about?: string;
}

interface School {
  school_name: string;
  school_img: string;
  school_about?: string;
}

interface Course {
  _id: string;
  course_name: string;
  course_img: string;
  course_about?: string;
  course_videos: string[];
  school: School;
  teachers: Teacher[];
}
