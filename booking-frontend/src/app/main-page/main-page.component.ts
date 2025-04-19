import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
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
  BookingRoomCurrent,
  BookingService,
} from '../services/booking.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogConfig,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { BookDialogComponent } from '../book-dialog/book-dialog.component';
import { EditDialogData } from '../admin-page/admin-page.component';
import { Router } from '@angular/router';

export interface BookDialogData {
  data: {
    id: number;
    capacity: number;
    location: string;
    roomNumber: number;
    is_active: boolean;
  };
  updateRoomList: () => void;
}

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,

  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainComponent implements OnInit {
  title = 'booking-frontend';
  isAuth: boolean;
  savedBookingRooms: BookingRoom[] = [];
  savedUserBookingRooms: BookingRoomCurrent[] = [];
  readonly dialog = inject(MatDialog);

  constructor(
    private authService: AuthService,
    private bookingService: BookingService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (!this.authService.isAuth$) {
      this.router.navigate(['auth']);
    }

    this.authService.isAuth$?.subscribe((isAuth) => {
      this.isAuth = isAuth;
      this.updateRoomList();
    });
  }

  bookRoom(room: BookingRoom): void {
    const dialogData: BookDialogData = {
      data: {
        id: room.id,
        capacity: room.capacity,
        roomNumber: room.roomNumber,
        location: room.location,
        is_active: room.is_active,
      },
      updateRoomList: this.updateRoomList.bind(this),
    };

    this.dialog
      .open<BookDialogComponent, MatDialogConfig, BookDialogData>(
        BookDialogComponent,
        {
          width: '800px',
          data: dialogData,
        }
      )
      .afterClosed()
      .pipe
      ()
      .subscribe({
        next: () => { },
        error: (err) => {
          alert('Ошибка!');
        },
      });
  }

  cancelBook(room: BookingRoomCurrent): void {
    this.bookingService.cancelBooking(room.id).subscribe({
      next: () => {
        alert('Бронь комнаты отменена!');
        this.updateRoomList();
      },
      error(err) {
        alert('Ошибка!');
      },
    });
  }

  updateRoomList(): void {
    this.bookingService.getSavedBookingRooms().subscribe({
      next: (savedBookingRooms) => {
        this.savedBookingRooms = savedBookingRooms || [];
        this.cdr.detectChanges();
      },
      error(err) {
        alert('Ошибка!');
      },
    });

    this.bookingService.getUserCurrentBookingRooms().subscribe({
      next: (savedUserBookingRooms) => {
        this.savedUserBookingRooms = savedUserBookingRooms || [];
        this.cdr.detectChanges();
      },
      error(err) {
        alert('Ошибка!');
      },
    });
  }

  getDateFromDateTimeString(dateTimeStr: string): string {
    return dateTimeStr.split('T')[0];
  }

  getTimeFromDateTimeString(dateTimeStr: string): string {
    return dateTimeStr.split('T')[1].split('.')[0];
  }
}
