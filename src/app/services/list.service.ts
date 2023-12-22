import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

const API_URL = 'http://localhost:7790'
const MER_API = "https://merchant.tirgo.io/api/v1"
@Injectable({
  providedIn: 'root'
})

export class ListService {
  currentUser
  constructor(
    private http: HttpClient,
  ) {
    this.currentUser = localStorage.getItem('merchantJWT')
  }


  getAllOrders(from: number, limit: number, id, id_client, from_city, to_city, status, typecargo, typetransport, price, dateCreate, dateSend, saveorder) {
    const sUrl = API_URL + '/reborn/getAllOrders';
    const body = JSON.stringify({
      from, limit, id, id_client, from_city, to_city, status, typecargo, typetransport, price, dateCreate, dateSend, saveorder
    });
    return this.http.post<any>(sUrl, body);
  }

  getMerchantOrders() {
    const sUrl = MER_API + '/cargo/all';
    return this.http.get<any>(sUrl)
      .pipe(map(res => {
        if (res.data) {
          return res.data;
        } else {
          return [];
        }
      }));
  }


  getAllDrivers(from: number, limit: number, id, phone, dateReg, dateLogin, name, indentificator, typetransport) {
    const sUrl = API_URL + '/reborn/getAllDrivers';
    const body = JSON.stringify({
      from, limit, id, phone, dateReg, dateLogin, name, indentificator, typetransport
    });
    return this.http.post<any>(sUrl, body);
  }

  getAllDriversAgent(from: number, limit: number,  agent_id) {
    const sUrl = API_URL + '/reborn/getAllDriversByAgent';
    const body = JSON.stringify({
      from, limit, agent_id,
    });
    return this.http.post<any>(sUrl, body);
  }

  getAllunVerifiedDrivers() {
    const sUrl = API_URL + '/users/unverified-verifications';
    return this.http.get<any>(sUrl)
      .pipe(map(res => {
        if (res && res.data) {
          return res;
        } else {
          return [];
        }
      }));
  }

  getsumOfDriversSubcription(id) {
    const sUrl = API_URL + `/admin/sumOfDriversSubcription/${id}`;
    return this.http.get<any>(sUrl)
      .pipe(map(res => {
        if (res && res.data) {
          return res;
        } else {
          return [];
        }
      }));
  }

  getAgent(id) {
    const sUrl = API_URL + `/admin/getAgent/${id}`;
    return this.http.get<any>(sUrl)
      .pipe(map(res => {
        if (res && res.data) {
          return res;
        } else {
          return [];
        }
      }));
  }

  getAllVerifiedDrivers() {
    const sUrl = API_URL + '/users/verified-verifications';
    return this.http.get<any>(sUrl)
      .pipe(map(res => {
        if (res && res.data) {
          return res;
        } else {
          return [];
        }
      }));
  }

  editVerifyDriver(data) {
    const sUrl = API_URL + '/users/update-verification';
    return this.http.put<any>(sUrl, data)
      .pipe(map(res => {
        if (res.data) {
          return res.data;
        } else {
          return [];
        }
      }));
  }

  postImage(body) {
    const sUrl = API_URL + '/users/uploadImage';
    return this.http.post<any>(sUrl, body);
  }

  delPhotoUser(file: string) {
    const sUrl = API_URL + '/users/delPhotoUser';
    const body = JSON.stringify({
      filename: file
    });
    return this.http.post<any>(sUrl, body);
  }

  verifyDriverItem(id) {
    const sUrl = API_URL + `/users/verify-driver`;
    return this.http.patch<any>(sUrl, { id })
      .pipe(map(res => {
        if (res.data) {
          return res.data;
        } else {
          return [];
        }
      }));
  }

  getAllDriversList(id, phone, dateReg, dateLogin, name, indentificator, typetransport) {
    const sUrl = API_URL + '/reborn/getAllDriversList';
    const body = JSON.stringify({
      id, phone, dateReg, dateLogin, name, indentificator, typetransport
    });
    return this.http.post<any>(sUrl, body);
  }

  getAllTrackingDrivers() {
    const sUrl = API_URL + '/reborn/getAllTrackingDrivers';
    const body = JSON.stringify({});
    return this.http.post<any>(sUrl, body);
  }

  getReqFinanceDrivers() {
    const sUrl = API_URL + '/users/driver/withdrawals';
    return this.http.get<any>(sUrl);
  }

  closeReqFinanceDrivers(data) {
    const sUrl = API_URL + '/users/verify-withdrawal/verify/' + data.id;
    const body = JSON.stringify({
    });
    return this.http.patch<any>(sUrl, body);
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


  getAllSubscription() {
    const sUrl = API_URL + '/admin/subscription';
    return this.http.get<any>(sUrl)
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
    const sUrl = MER_API + '/merchant/all';
    return this.http.get<any>(sUrl)
      .pipe(map(res => {
        if (res.data) {
          return res.data;
        } else {
          return [];
        }
      }));
  }

  getMerchantById(id) {
    const sUrl = MER_API + '/merchant/id?id=' + id;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDc3OGM0ZS05YjUwLTQ1ZDMtODZmMS1iOTg5Y2M2YjM1NTQiLCJ1c2VybmFtZSI6ImVtaWFsQHRpcmdvb29vLnV6IiwibWVyY2hhbnRJZCI6IjUwYzJhYzg4LTEyYTctNDcxNS04YjBhLTljOTNhYjJhYjg1OCIsImlhdCI6MTcwMDIyMTUwMH0.SkU7fc2jpD6yrQHo_1JNM7QOaIiaQse9aF5sr0HjDd8'

    return this.http.get<any>(sUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .pipe(map(res => {
        if (res.data) {
          return res.data;
        } else {
          return [];
        }
      }));
  }

  editMerchant(data) {
    const sUrl = MER_API + '/merchant?id=' + data.id;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5YmJkODU4MS1hMDViLTQ2ZjctYjQ3MS0wYWI0NGY2M2MxMTQiLCJ1c2VybmFtZSI6ImFkbWluIiwibWVyY2hhbnRJZCI6IjUwYzJhYzg4LTEyYTctNDcxNS04YjBhLTljOTNhYjJhYjg1OCIsImlhdCI6MTcwMDA0NzMyMn0.pi5JIMZD_-fzHMPh33CpYjNDbfZnNAEDCrwYb50HoN0'

    return this.http.put<any>(sUrl, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .pipe(map(res => {
        if (res.data) {
          return res.data;
        } else {
          return [];
        }
      }));
  }

  getVerifiedMerchants() {
    const sUrl = MER_API + '/merchant/verified';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5YmJkODU4MS1hMDViLTQ2ZjctYjQ3MS0wYWI0NGY2M2MxMTQiLCJ1c2VybmFtZSI6ImFkbWluIiwibWVyY2hhbnRJZCI6IjUwYzJhYzg4LTEyYTctNDcxNS04YjBhLTljOTNhYjJhYjg1OCIsImlhdCI6MTcwMDA0NzMyMn0.pi5JIMZD_-fzHMPh33CpYjNDbfZnNAEDCrwYb50HoN0'

    return this.http.get<any>(sUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .pipe(map(res => {
        if (res.data) {
          return res.data;
        } else {
          return [];
        }
      }));
  }

  getUnverifiedMerchants() {
    const sUrl = MER_API + '/merchant/unverified';
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
    const sUrl = MER_API + '/merchant/id?id=' + id;
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
    const sUrl = MER_API + '/merchant/verify?id=' + id;
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
    const sUrl = MER_API + '/merchant/reject?id=' + id;
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

  getTransactionByMerchant(id) {
    const sUrl = MER_API + '/transaction/merchant?id=' + id;
    return this.http.get<any>(sUrl)
      .pipe(map(res => {
        if (res) {
          return res;
        } else {
          return [];
        }
      }));
  }

  getOrdersByMerchant(id) {
    const sUrl = MER_API + '/cargo/merchant?id=' + id;
    return this.http.get<any>(sUrl);
  }

  getMerchantBalance(id) {
    const sUrl = MER_API + '/transaction/merchant/balance?id=' + id;
    return this.http.get<any>(sUrl)
      .pipe(map(res => {
        if (res) {
          return res;
        } else {
          return [];
        }
      }));
  }

  rejectTransaction(id) {
    const sUrl = MER_API + '/transaction/reject?id=' + id;
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

  verifyTransaction(id) {
    const sUrl = MER_API + '/transaction/verify?id=' + id;
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


  getSubscription() {
    const sUrl = API_URL + '/admin/subscription';
    return this.http.get<any>(sUrl)
      .pipe(map(res => {
        if (res.status) {
          return res.data;
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
