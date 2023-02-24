import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http : HttpClient) { }


  baseUrl = "http://localhost:8080/employeepayrollservice"


  addEmployeeData(body: any): Observable<any> {
    return this.http.post(this.baseUrl + "/add", body);
  }

  getEmployeeData(): Observable<any> {
    return this.http.get(this.baseUrl + "/getallemp");
  }

  updateEmployeeById(employee: any,Id: number) {
    return this.http.put("http://localhost:8080/employeepayrollservice/update/"+Id, employee);
  }
   
  deleteById(employeeId:number): Observable<any> {
    return this.http.delete("http://localhost:8080/employeepayrollservice/delete/"+employeeId);
  }
}
