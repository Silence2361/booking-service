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
import { AuthService, LoginData, RegisterData } from '../services/auth.service';
import {
  BookingRoom,
  BookingService,
  BookRoom,
} from '../services/booking.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { BookDialogData } from '../main-page/main-page.component';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-dialog',
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
  templateUrl: './book-dialog.component.html',
  styleUrl: './book-dialog.component.scss',
})
export class BookDialogComponent implements OnInit {
  dates = [
    {
      date: '19 Oct. 2025',
    },
    {
      date: '20 Oct. 2025',
    },
    {
      date: '21 Oct. 2025',
    },
  ];

  timeStart = [
    {
      time: '10:00',
    },
    {
      time: '11:00',
    },
    {
      time: '12:00',
    },
  ];

  timeEnd = [
    {
      time: '14:00',
    },
    {
      time: '15:00',
    },
    {
      time: '16:00',
    },
  ];

  bookForm = new FormGroup({
    date: new FormControl(null, Validators.required),
    timeStart: new FormControl(null, Validators.required),
    timeEnd: new FormControl(null, Validators.required),
  });

  constructor(
    private dialogRef: MatDialogRef<BookDialogComponent, BookDialogComponent>,
    private bookingService: BookingService,
    @Inject(MAT_DIALOG_DATA) public data: BookDialogData
  ) { }

  ngOnInit(): void { }

  bookRoom(): void {
    console.log(
      this.createTimestamp(
        new Date(this.bookForm.controls.date.value),
        this.bookForm.controls.timeStart.value
      )
    );
    console.log(
      this.createTimestamp(
        new Date(this.bookForm.controls.date.value),
        this.bookForm.controls.timeEnd.value
      )
    );

    if (!localStorage.getItem('user_id')) {
      return;
    }

    const body: BookRoom = {
      startTime: this.createTimestamp(
        new Date(this.bookForm.controls.date.value),
        this.bookForm.controls.timeStart.value
      ),
      endTime: this.createTimestamp(
        new Date(this.bookForm.controls.date.value),
        this.bookForm.controls.timeEnd.value
      ),
      roomId: this.data.data.id,
      userId: +localStorage.getItem('user_id'),
    };

    this.bookingService.bookRoom(body).subscribe({
      next: () => {
        this.dialogRef.close();
        alert('Комната забронирована!');
        this.data.updateRoomList();
      },
      error(err) {
        alert('Ошибка!');
      },
    });
  }

  private createTimestamp(date: Date, timeStr: string): string {
    const [hours, minutes] = timeStr.split(':');
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      +hours,
      +minutes
    )
      .toISOString()
      .split('.')[0];
  }
}
