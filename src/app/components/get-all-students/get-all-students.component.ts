import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StudentService } from '../../service/student/student.service';
import { NotificationService } from '../../service/notification/notification.service';

@Component({
  selector: 'app-get-all-students',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './get-all-students.component.html',
  styleUrl: './get-all-students.component.css',
})
export class GetAllStudentsComponent {
  students: any = [];
  selectedStudent: any = {};

  constructor(
    private studentService: StudentService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.getAllStudents();
  }

  getAllStudents() {
    this.studentService.getAllStudent().subscribe({
      next: (res) => {
        this.students = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getAge(birthDate: string) {
    const birthDateObj = new Date(birthDate);
    const ageDifMs = Date.now() - birthDateObj.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970); // tahun awal komputer 1970 (epoch time)
  }

  deleteStudent(id: number) {
    this.studentService.deleteStudent(id).subscribe({
      next: (res) => {
        this.getAllStudents();
        this.notificationService.showSuccess('Student deleted!');
      },
      error: (err) => {
        this.notificationService.showError('Something went wrong! ');
      },
    });
  }
}
