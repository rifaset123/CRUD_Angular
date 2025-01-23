import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../service/student/student.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../../service/notification/notification.service';

@Component({
  selector: 'app-update-student',
  imports: [ReactiveFormsModule],
  templateUrl: './update-student.component.html',
  styleUrl: './update-student.component.css',
})
export class UpdateStudentComponent {
  id!: number;
  updateStudentForm!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.updateStudentForm = this.fb.group({
      nim: ['', [Validators.required]],
      namaDepan: [null, [Validators.required]],
      namaBelakang: [null, [Validators.required]],
      tanggalLahir: [null, [Validators.required]],
    });
    this.getStudentById();
  }

  getStudentById() {
    this.studentService.getAllStudentById(this.id).subscribe({
      next: (res) => {
        console.log(res);
        this.updateStudentForm.patchValue(res);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  updateStudent() {
    if (this.updateStudentForm.valid) {
      this.studentService
        .updateStudent(this.id, this.updateStudentForm.value)
        .subscribe({
          next: (res) => {
            if (res.id != null) {
              this.router.navigateByUrl('');
              this.updateStudentForm.patchValue(res);
            }
            this.notificationService.showSuccess('Student updated!');
          },
          error: (err) => {
            console.error(err);
            this.notificationService.showError('Something went wrong! ');
          },
        });
    } else {
      this.notificationService.showWarning(
        'Please fill out all required fields correctly.'
      );
    }
  }

  deleteStudent() {
    this.studentService.deleteStudent(this.id).subscribe({
      next: (res) => {
        console.log(res);
        this.notificationService.showSuccess('Student deleted!');
        this.router.navigateByUrl('');
      },
      error: (err) => {
        console.error(err);
        this.notificationService.showError('Something went wrong! ');
      },
    });
  }
}
