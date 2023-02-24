import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/service/employee.service';



@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.css']
})
export class AddEmpComponent {
  employeeForm!: FormGroup;


  departments: Array<any> = [
    { id: 1, name: "HR", value: "HR", checked: false },
    { id: 2, name: "Sales", value: "Sales", checked: false },
    { id: 3, name: "Finance", value: "Finance", checked: false  },
    { id: 4, name: "Engineer", value: "Engineer", checked: false },
    { id: 5, name: "Other", value: "Other", checked: false }
  ]


  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private httpService: EmployeeService,) {
this.employeeForm = this.formBuilder.group({
name: new FormControl('', [Validators.required,
                      Validators.maxLength(30),
                      Validators.minLength(3)]),
profilePic: new FormControl('', Validators.required),
gender: new FormControl('', Validators.required),
department: new FormArray([], Validators.required),
salary: new FormControl('', Validators.required),
startDate: new FormControl('', Validators.required),
note: new FormControl('', Validators.required)
})
}

  ngOnInit(): void {
  }


  onDepartmentChange(event: any){
    const departmentValue = event.source.value
    const selectedDepartment = event.checked
    const departmentArray: FormArray = this.employeeForm.get('department') as FormArray;


    if (selectedDepartment) {
      departmentArray.push(new FormControl(departmentValue));
    } else {
      const index = departmentArray.controls.findIndex(x => x.value === departmentValue);
      departmentArray.removeAt(index);
    }
  }
  salary: any = 400000;
  updateSetting(event: any) {
    this.salary = event.value;
  }


  formatLabel(value: any) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }


 

  get formControls(){
    return this.employeeForm.controls
  }


  public myError = (controlName: string, errorName: string) => {
    return this.employeeForm.controls[controlName].hasError(errorName)
  }


  get fullName(): FormControl{
    return this.employeeForm.get('name') as FormControl
  }


  

  resetForm(){
    this.employeeForm.reset()
  }

  public employee: Employee = new Employee();
  
  submitForm(){
    console.log(this.employeeForm.value)
    this.httpService.addEmployeeData(this.employee).subscribe(response => {
      console.log(response)
      this.router.navigate(['home'])
    })
   }




}
