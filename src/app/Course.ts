export interface Course {
  id: number;
  name: string;
  ECTS: number;
  semester: number;
  form: string;
  studentsEnrolled: number;
  studentsLimit: number;
  currentRating: number;
  avatar: string;
  description: string;
}
