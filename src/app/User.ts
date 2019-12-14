import {Course} from './Course';

export interface User {
  id: number;
  roles: string[];
  coursesEnrollment: {
    id: number;
    rating?: number;
  }[];
}
