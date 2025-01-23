import { Component } from '@angular/core';
import { StudentService } from '../../service/student/student.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { NotificationService } from '../../service/notification/notification.service';

@Component({
  selector: 'app-post-student-new',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatButtonModule],
  templateUrl: './post-student.component.html',
  styleUrls: ['./post-student.component.css'],
})
export class PostStudentComponent {
  postStudentForm!: FormGroup;
  today: string;

  constructor(
    private studentService: StudentService,
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService
  ) {
    const now = new Date();
    this.today = now.toISOString().split('T')[0];
  }

  ngOnInit() {
    this.postStudentForm = this.fb.group({
      nim: ['', [Validators.required]],
      namaDepan: [null, [Validators.required]],
      namaBelakang: [null, [Validators.required]],
      tanggalLahir: [null, [Validators.required]],
    });
  }

  postStudent() {
    if (this.postStudentForm.valid) {
      // Call the API to post the student data
      this.studentService.postStudent(this.postStudentForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.notificationService.showSuccess('Student created successfully!');
          this.postStudentForm.reset();
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          console.error(err);
          this.notificationService.showError('Something went wrong!');
        },
      });
    } else {
      this.notificationService.showWarning(
        'Please fill out all required fields correctly.'
      );
    }
  }
}
