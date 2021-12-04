import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { userSetting } from '../models/userSetting';

@Injectable({
  providedIn: 'root',
})
export class UserSettingsService {
  private defaultUser: userSetting = {
    corporateName: 'Entemple Solutions Inc.',
    payableTo: 'Entemple Solutions Inc.',
    addressLine1: '7462 115A St.',
    city: 'Delta',
    postalCode: 'V4C 5P8',
    email: 'rishisg@gmail.com',
    phone: '778-319-7170',
    gstNumber: '77334 8073 RT0001',
    name: 'Rishi',
    addressLine2: null,
  };
  constructor() {}

  getUserSettings(): userSetting {
    return this.defaultUser;
  }
}
