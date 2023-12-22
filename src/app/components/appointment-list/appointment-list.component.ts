import { Appointment } from './../../interfaces/appointment';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-appointement-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './appointment-list.component.html',
})
export class AppointmentListComponent implements OnInit {
  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      let savedAppointments = localStorage.getItem('appointments');
      this.appointments = savedAppointments
        ? JSON.parse(savedAppointments)
        : [];
    }
  }

  inputForm = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern(/^[a-zA-Z\s]*$/),
    ]),
    date: new FormControl<Date>(new Date(), [Validators.required]),
  });

  appointments: Appointment[] = [];

  onSubmit() {
    if (this.inputForm.valid) {
      this.addAppointment();
    } else {
      console.log('validation wrong');
    }
  }
  addAppointment() {
    const newAppointment: Appointment = {
      id: this.appointments.length + 1,
      title: this.inputForm.value.title ?? '',
      date: this.inputForm.value.date ?? new Date(),
    };
    this.appointments.push(newAppointment);
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
    this.inputForm.reset();
  }
  deleteAppointment(index: number) {
    this.appointments = this.appointments.filter((_, i) => i !== index);
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
  }
}
