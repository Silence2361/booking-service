import { Component, Inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { BookingService } from '../services/booking.service';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { EditDialogData, EditType } from '../admin-page/admin-page.component';

@Component({
  selector: 'app-add-dialog',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
  ],
  templateUrl: './add-dialog.component.html',
  styleUrl: './add-dialog.component.scss',
})
export class AddDialogComponent implements OnInit {
  addForm = new FormGroup({
    capacity: new FormControl<number | null>(null, Validators.required),
    location: new FormControl<string | null>(null, Validators.required),
    roomNumber: new FormControl<number | null>(null, Validators.required),
  });

  editType = EditType;

  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent, EditDialogData>,
    private bookingService: BookingService,
    @Inject(MAT_DIALOG_DATA) public data: EditDialogData
  ) { }

  ngOnInit(): void {
    if (this.data.data) {
      this.addForm.setValue({
        capacity: this.data.data.capacity,
        roomNumber: this.data.data.roomNumber,
        location: this.data.data.location,
      });
    }
  }

  addRoom(): void {
    const body = {
      capacity: +this.addForm.controls.capacity.value,
      location: this.addForm.controls.location.value,
      roomNumber: +this.addForm.controls.roomNumber.value,
    };

    this.bookingService.addRoom(body).subscribe({
      next: () => {
        this.dialogRef.close()
        alert('Комната добавлена!')
        this.data.updateRoomList()
      },
      error(err) {
        alert('Ошибка!')
      },
    });
  }

  editRoom(): void {
    const body = {
      capacity: +this.addForm.controls.capacity.value,
      location: this.addForm.controls.location.value,
      roomNumber: +this.addForm.controls.roomNumber.value,
    };
    console.log(body);

    this.bookingService.editRoom(body, this.data.data.id).subscribe({
      next: () => {
        this.dialogRef.close()
        alert('Комната изменена!')
        this.data.updateRoomList()
      },
      error(err) {
        console.log(err);
      },
    });
  }
}
