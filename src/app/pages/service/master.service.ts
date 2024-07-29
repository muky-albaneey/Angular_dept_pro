import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  apiUrl = "https://nestjs-ticketing-typeorm-eith-docker.onrender.com/"
  constructor(private http : HttpClient) { }


  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

   options = {
    headers: this.headers,
    withCredentials: true // This ensures cookies are sent with the request
  };

  login(obj:any){

    // debugger;
    return this.http.post(this.apiUrl+'login',obj, this.options)
  }

  getAllDepartment(){
    return this.http.get(`${this.apiUrl}department/all`);
  }

  createNewDepartment(obj:any){
    return this.http.post(`${this.apiUrl}department/create`,obj);
  }

  updateDepartment(obj:any){
    console.log('alhamdulillah',obj);
    return this.http.patch(`${this.apiUrl}department/update`,obj);
  }

  deletepartment(id:string){
    return this.http.get(`${this.apiUrl}/department/${id}`);
  }
}
