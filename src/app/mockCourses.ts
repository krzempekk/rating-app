import { Course } from './Course';

const mockCourses: Course[] = [
  { id: '1', name: 'Algebra', ECTS: 5, semester: 1, form: 'lecture', studentsEnrolled: 1, studentsLimit: 100, ratingSum: 3, ratingCount: 1, avatar: '', description: '' },
  { id: '2', name: 'Algorithms and Data Structures', ECTS: 5, semester: 1, form: 'lecture', studentsEnrolled: 0, studentsLimit: 100, ratingSum: 0, ratingCount: 0, avatar: '', description: '' },
  { id: '3', name: 'Introduction to Web Apps', ECTS: 5, semester: 1, form: 'lecture', studentsEnrolled: 0, studentsLimit: 100, ratingSum: 0, ratingCount: 0, avatar: '', description: '' },
  { id: '4', name: 'Introduction to Web Design', ECTS: 5, semester: 1, form: 'lecture', studentsEnrolled: 0, studentsLimit: 100, ratingSum: 0, ratingCount: 0, avatar: '', description: '' },
  { id: '5', name: 'Functional Programming', ECTS: 5, semester: 1, form: 'lecture', studentsEnrolled: 100, studentsLimit: 100, ratingSum: 0, ratingCount: 0, avatar: '', description: '' }
];

export default mockCourses;
