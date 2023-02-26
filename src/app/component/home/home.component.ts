import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  employeeCount: number = 0;
  employeeList: Employee[] = []


  constructor(private router: Router,private httpService: EmployeeService,) { }


  ngOnInit(): void {
    this.httpService.getEmployeeData().subscribe(response => {
      console.log(response)
      this.employeeList = response.data
      this.employeeCount = this.employeeList.length
    })
  }

  deleteById(Id: number) {
    console.log(Id);  
    this.httpService.deleteById(Id).subscribe((data)  =>{
    console.log("data deleted!!!!! test");
    this.ngOnInit();
     
    });
    
}


editById(Id: number) {
  this.router.navigate(['update', Id]);
}

}
