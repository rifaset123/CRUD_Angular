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
  styleUrls: ['./get-all-students.component.css'],
})
export class GetAllStudentsComponent {
  students: any = [];
  selectedStudent: any = {}; // data for selected student

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
        this.notificationService.showError('Failed to fetch students!');
      },
    });
  }

  getAge(birthDate: string) {
    const birthDateObj = new Date(birthDate);
    const ageDifMs = Date.now() - birthDateObj.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970); // waktu default mesin adalah 1970
  }

  setSelectedStudent(student: any) {
    this.selectedStudent = student;
  }

  deleteStudent(id: number) {
    this.studentService.deleteStudent(id).subscribe({
      next: () => {
        this.getAllStudents();
        this.notificationService.showSuccess('Student deleted successfully!');
      },
      error: (err) => {
        console.error(err);
        this.notificationService.showError('Failed to delete student!');
      },
    });
  }
}
