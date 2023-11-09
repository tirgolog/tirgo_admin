import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

const API_URL = 'https://admin.tirgo.io'

@Injectable({
  providedIn: 'root'
})

export class ListService {

  constructor(
    private http: HttpClient,
  ) {
  }


  getAllOrders(from: number, limit: number, id, id_client, from_city, to_city, status, typecargo, typetransport, price, dateCreate, dateSend, saveorder) {
    const sUrl = API_URL + '/reborn/getAllOrders';
    const body = JSON.stringify({
      from, limit, id, id_client, from_city, to_city, status, typecargo, typetransport, price, dateCreate, dateSend, saveorder
    });
    return this.http.post<any>(sUrl, body);
  }
  getAllDrivers(from: number, limit: number, id, phone, dateReg, dateLogin, name, indentificator, typetransport) {
    const sUrl = API_URL + '/reborn/getAllDrivers';
    const body = JSON.stringify({
      from, limit, id, phone, dateReg, dateLogin, name, indentificator, typetransport
    });
    return this.http.post<any>(sUrl, body);
  }
  getAllTrackingDrivers() {
    const sUrl = API_URL + '/reborn/getAllTrackingDrivers';
    const body = JSON.stringify({});
    return this.http.post<any>(sUrl, body);
  }
  getAllUsers(from: number, limit: number, id, phone, dateReg, dateLogin, name, city, sort, revers) {
    const sUrl = API_URL + '/reborn/getAllUsers';
    const body = JSON.stringify({
      from, limit, id, phone, dateReg, dateLogin, name, city, sort, revers
    });
    return this.http.post<any>(sUrl, body);
  }
  getDeletedUsers(from: number, limit: number) {
    const sUrl = API_URL + '/reborn/getDeletedUsers';
    const body = JSON.stringify({
      from, limit
    });
    return this.http.post<any>(sUrl, body);
  }
  getActivityUsers(from: number, limit: number) {
    const sUrl = API_URL + '/reborn/getActivityUsers';
    const body = JSON.stringify({
      from, limit
    });
    return this.http.post<any>(sUrl, body);
  }
  //old_version
  getAllAdmins() {
    const sUrl = API_URL + '/admin/getAllAdmins';
    const body = JSON.stringify({});
    return this.http.post<any>(sUrl, body)
      .pipe(map(res => {

        if (res.data) {
          return res.data;
        } else {
          return [];
        }
      }));
  }
  getAllRoles() {
    const sUrl = API_URL + '/admin/getAllRoles';
    const body = JSON.stringify({});
    return this.http.post<any>(sUrl, body)
      .pipe(map(res => {

        if (res.data) {
          return res.data;
        } else {
          return [];
        }
      }));
  }
  getSecureTrans() {
    const sUrl = API_URL + '/admin/getSecureTrans';
    const body = JSON.stringify({});
    return this.http.post<any>(sUrl, body)
      .pipe(map(res => {

        if (res.data) {
          return res.data;
        } else {
          return [];
        }
      }));
  }
  getTransactionsType() {
    const sUrl = API_URL + '/admin/getTransactionsType';
    const body = JSON.stringify({});
    return this.http.post<any>(sUrl, body)
      .pipe(map(res => {

        if (res.data) {
          return res.data;
        } else {
          return [];
        }
      }));
  }
  getAllMessages() {
    const sUrl = API_URL + '/admin/getAllMessages';
    return this.http.get<any>(sUrl)
      .pipe(map(res => {

        if (res.data) {
          return res.data;
        } else {
          return [];
        }
      }));
  }

  getAllMerchants() {
    const sUrl = API_URL + '/merchant/all';
    return this.http.get<any>(sUrl)
      .pipe(map(res => {
        if (res.data) {
          return res.data;
        } else {
          return [];
        }
      }));
  }

  getVerifiedMerchants() {
    const sUrl = API_URL + '/merchant/verified';
    return this.http.get<any>(sUrl)
      .pipe(map(res => {
        if (res.data) {
          return res.data;
        } else {
          return [];
        }
      }));
  }

  getUnverifiedMerchants() {
    const sUrl = API_URL + '/merchant/unverified';
    return this.http.get<any>(sUrl)
      .pipe(map(res => {
        if (res.data) {
          return res.data;
        } else {
          return [];
        }
      }));
  }

  getAllMerchantItem(id) {
    const sUrl = API_URL + '/merchant/id?id=' + id;
    return this.http.get<any>(sUrl)
      .pipe(map(res => {
        if (res.data) {
          return res.data;
        } else {
          return [];
        }
      }));
  }

  verifyMerchant(id) {
    const sUrl = API_URL + '/merchant/verify?id=' + id;
    const body = JSON.stringify({});
    return this.http.patch<any>(sUrl, body)
      .pipe(map(res => {
        if (res) {
          return res;
        } else {
          return [];
        }
      }));
  }

  rejectMerchant(id) {
    const sUrl = API_URL + '/merchant/reject?id=' + id;
    const body = JSON.stringify({});
    return this.http.patch<any>(sUrl, body)
      .pipe(map(res => {
        if (res) {
          return res;
        } else {
          return [];
        }
      }));
  }

  getTypeCargo() {
    const sUrl = API_URL + '/admin/getTypeCargo';
    return this.http.get<any>(sUrl)
      .pipe(map(res => {
        if (res.status) {
          return res.data;
        } else {
          return [];
        }
      }));
  }
  getTypeTruck() {
    const sUrl = API_URL + '/users/getTypeTruck';
    return this.http.get<any>(sUrl)
      .pipe(map(res => {

        if (res.status) {
          return res.data;
        } else {
          return [];
        }
      }));
  }
  getAllReviews() {
    const sUrl = API_URL + '/users/getAllReviews';
    const body = JSON.stringify({});
    return this.http.post<any>(sUrl, body)
      .pipe(map(res => {

        if (res.data) {
          return res.data;
        } else {
          return false;
        }
      }));
  }

}
