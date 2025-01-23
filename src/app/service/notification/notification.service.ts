import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root', // This makes the service globally available
})
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  showSuccess(message: string, title: string = 'Success!') {
    this.toastr.success(message, title, { closeButton: true, timeOut: 4000 });
  }

  showError(message: string, title: string = 'Error!') {
    this.toastr.error(message, title, { closeButton: true, timeOut: 4000 });
  }

  showWarning(message: string, title: string = 'Warning!') {
    this.toastr.warning(message, title, { closeButton: true, timeOut: 4000 });
  }
}
