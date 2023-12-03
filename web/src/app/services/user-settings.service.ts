import { Injectable } from '@angular/core';
import { userSetting } from '../models/userSetting';

@Injectable({
  providedIn: 'root',
})
export class UserSettingsService {
  private defaultUser: userSetting = {
    corporateName: '<corporateName>',
    payableTo: '<payableTo>',
    addressLine1: '<addressLine1>',
    city: '<city>',
    postalCode: '<postalCode>',
    email: '<email>',
    phone: '<phone>',
    gstNumber: '<gstNumber>',
    name: '<name>',
    addressLine2: '<addressLine2>',
  };

  constructor() {}

  getUserSettings(): userSetting {
    return this.defaultUser;
  }
}
