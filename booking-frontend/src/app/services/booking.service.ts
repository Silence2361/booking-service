import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface BookingRoom {
  capacity: number;
  location: string;
  id: number;
  is_active: boolean;
  roomNumber: number;
}

export interface BookingRoomCurrent {
  id: number;
  userId: number;
  roomId: number;
  startTime: string;
  endTime: string;
}

export interface BookRoom {
  startTime: string;
  endTime: string;
  roomId: number;
  userId: number;
}

export interface CreateRoom {
  roomNumber: number;
  capacity: number;
  location: string;
}

export interface BookingRoomFront extends BookingRoom {
  room_name: string;
}

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  baseURL = 'https://booking-backend.onrender.com';

  constructor(private http: HttpClient) { }

  getSavedBookingRooms(): Observable<BookingRoom[]> {
    console.log('getSavedBookingRooms');
    return this.http.get<BookingRoom[]>(`${this.baseURL}/rooms`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
  }

  getCurrentBookingRooms(): Observable<BookingRoomCurrent[]> {
    console.log('getCurrentBookingRooms');
    return this.http.get<BookingRoomCurrent[]>(`${this.baseURL}/bookings`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
  }

  getUserCurrentBookingRooms(): Observable<BookingRoomCurrent[]> {
    console.log('getCurrentBookingRooms');
    return this.http.get<BookingRoomCurrent[]>(`${this.baseURL}/bookings/my-bookings/${+localStorage.getItem('user_id')}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
  }

  bookRoom(body: BookRoom): Observable<void> {
    console.log(body);
    console.log('room booked');
    return this.http.post<void>(`${this.baseURL}/bookings`, body, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
  }

  addRoom(body: CreateRoom): Observable<void> {
    console.log(body);
    console.log('room added');
    return this.http.post<void>(`${this.baseURL}/rooms`, body, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
  }

  editRoom(body: any, id: number): Observable<void> {
    console.log(body);
    console.log('room edited')
    return this.http.put<void>(`${this.baseURL}/rooms/${id}`, body, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
  }

  deleteRoom(id: number): Observable<void> {
    console.log('room deleted');
    return this.http.delete<void>(`${this.baseURL}/rooms/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
  }

  deactiveRoom(id: number): Observable<void> {
    console.log('room deleted');
    return this.http.delete<void>(`${this.baseURL}/bookings/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
  }

  cancelBooking(id: number): Observable<void> {
    console.log('room cancel');
    return this.http.delete<void>(`${this.baseURL}/bookings/my-bookings/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
  }
}
