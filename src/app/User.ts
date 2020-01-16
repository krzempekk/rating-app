export interface User {
  id: string;
  roles: string[];
  coursesEnrollment: {
    id: string;
    rating?: number;
  }[];
}
