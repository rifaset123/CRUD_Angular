import { Routes } from '@angular/router';
import { PostStudentComponent } from './components/post-student/post-student.component';
import { GetAllStudentsComponent } from './components/get-all-students/get-all-students.component';
import { UpdateStudentComponent } from './components/update-student/update-student.component';

export const routes: Routes = [
  {
    path: '',
    component: GetAllStudentsComponent
  },
  {
    path: 'student',
    component: PostStudentComponent
  },
  {
    path: 'student/:id',
    component: UpdateStudentComponent
  },
];
