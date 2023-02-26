import { Component } from '@angular/core';
import { Employee } from 'src/app/model/employee';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';

import { FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { EmployeeService } from 'src/app/service/employee.service';


@Component({
  selector: 'app-update-emp',
  templateUrl: './update-emp.component.html',
  styleUrls: ['./update-emp.component.css']
})
export class UpdateEmpComponent {
  public employee: Employee = new Employee();
  employeeForm! :FormGroup
  id: number = 0;

  departments: Array<any> = [
    { id: 1, name: "HR", value: "HR", checked: false },
    { id: 2, name: "Sales", value: "Sales", checked: false },
    { id: 3, name: "Finance", value: "Finance", checked: false  },
    { id: 4, name: "Engineer", value: "Engineer", checked: false },
    { id: 5, name: "Other", value: "Other", checked: false }
  ]

  constructor(private route: ActivatedRoute,private router: Router, private formBuilder: FormBuilder,
    private httpService: EmployeeService) { 
    
    }

  ngOnInit() {
    this.employee = new Employee();

    this.id = this.route.snapshot.params['id'];
    
    this.httpService.getEmployeeById(this.id)
      .subscribe(response => {
        console.log(response.data)
        this.employee = response.data;
        console.log(this.employee.name)
      });
  }


  salary: number = 400000;
  updateSetting(event: any) {
    this.salary = event.target.value;
  }
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }

  onDepartmentChange(event: any){
    const departmentValue = event.target.value
    const selectedDepartment = event.target.checked
    const departmentArray: FormArray = this.employeeForm.get('departments') as FormArray;

    if (selectedDepartment) {
      departmentArray.push(new FormControl(departmentValue));
    } else {
      const index = departmentArray.controls.findIndex(x => x.value === departmentValue);
      departmentArray.removeAt(index);
    }
  }

  updateEmployee() {
    console.log(this.employee)
    this.httpService.updateEmployeeById(this.employee, this.id)
      .subscribe(data => {
        console.log(data);
        this.employee = new Employee();
        this.gotoList();
      }); 
  }

  submitForm() {
    this.updateEmployee();    
  }

  gotoList() {
    this.router.navigate(['']);
  }


}
