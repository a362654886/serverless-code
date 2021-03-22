
interface CourseClass {
  _id: string;
  courseId: string;
  studentId: string;
  studentName: string;
}

interface CourseClassDelete {
  courseId: string;
  studentId: string;
}

export { CourseClass, CourseClassDelete };
