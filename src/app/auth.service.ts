import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  postData(empData:any):Observable <any>
  {
    return this.http.post('http://task.soft-zone.net/api/Employees/addEmployee',empData)
  }

  getData():Observable <any>
  {
    return this.http.get('http://task.soft-zone.net/api/Employees/getAllEmployees')
  }

  updateData(empData:any):Observable <any>
  {
    return this.http.post('http://task.soft-zone.net/api/Employees/editEmployee',empData)
  }

  deleteData(emp_id:Number):Observable <any>
  {
    return this.http.get(`http://task.soft-zone.net/api/Employees/deleteEmpByID/${emp_id}/`)
  }


  
}
