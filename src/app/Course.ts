export interface Course {
  id: string;
  name: string;
  ECTS: number;
  semester: number;
  form: string;
  studentsEnrolled: number;
  studentsLimit: number;
  ratingSum: number;
  ratingCount: number;
  avatar: string;
  description: string;
}
