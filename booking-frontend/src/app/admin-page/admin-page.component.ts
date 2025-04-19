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
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../services/auth.service';
import {
  BookingRoom,
  BookingRoomCurrent,
  BookingService,
} from '../services/booking.service';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { BookDialogComponent } from '../book-dialog/book-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { filter } from 'rxjs';
import { Router } from '@angular/router';

export enum EditType {
  Add,
  Edit,
}

export interface EditDialogData {
  type: EditType;
  data: {
    id: number;
    capacity: number;
    location: string;
    roomNumber: number;
  } | null;
  updateRoomList: () => void;
}

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,

  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
})
export class AdminComponent implements OnInit {
  title = 'booking-frontend';
  isAuth: boolean;
  savedBookingRooms: BookingRoom[] = [];
  currentBookingRooms: BookingRoomCurrent[] = [];
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

    this.authService.isAuth$.subscribe((isAuth) => {
      this.isAuth = isAuth;
      this.updateRoomList();
    });
  }

  addRoomDialog(): void {
    const dialogData: EditDialogData = {
      type: EditType.Add,
      data: null,
      updateRoomList: this.updateRoomList.bind(this),
    };

    this.dialog
      .open<AddDialogComponent, MatDialogConfig, EditDialogData>(
        AddDialogComponent,
        {
          width: '800px',
          data: dialogData,
        }
      )
      .afterClosed()
      .pipe(filter((res) => !!res))
      .subscribe({
        next: () => { },
        error: (err) => {
          alert('Ошибка!');
        },
      });
  }

  editRoomDialog(room: BookingRoom): void {
    const dialogData: EditDialogData = {
      type: EditType.Edit,
      data: {
        id: room.id,
        capacity: room.capacity,
        roomNumber: room.roomNumber,
        location: room.location,
      },
      updateRoomList: this.updateRoomList.bind(this),
    };

    this.dialog
      .open<AddDialogComponent, MatDialogConfig, EditDialogData>(
        AddDialogComponent,
        {
          width: '800px',
          data: dialogData,
        }
      )
      .afterClosed()
      .pipe(filter((res) => !!res))
      .subscribe({
        next: () => { },
        error: (err) => {
          alert('Ошибка!');
        },
      });
  }

  deleteRoom(room: BookingRoom): void {
    this.bookingService.deleteRoom(room.id).subscribe({
      next: () => {
        alert('Комната удалена!');
        this.updateRoomList();
      },
      error(err) {
        alert('Ошибка!');
      },
    });
  }

  deactiveRoom(booking: BookingRoomCurrent): void {
    this.bookingService.deactiveRoom(booking.id).subscribe({
      next: () => {
        alert('Комната удалена!');
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
        alert('Ошибка!')
      },
    });

    this.bookingService.getCurrentBookingRooms().subscribe({
      next: (currentBookingRooms) => {
        this.currentBookingRooms = currentBookingRooms || [];
        this.cdr.detectChanges();
      },
      error(err) {
        alert('Ошибка!')
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
