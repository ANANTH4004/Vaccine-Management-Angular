import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../register.service';
import { User } from '../User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  UserReg !: FormGroup;
  constructor(private fb : FormBuilder , private http : HttpClient ,private UserService : RegisterService ,private router : Router ){
    this.UserReg = this.fb.group({
      userName : ['',[Validators.required , Validators.maxLength(20)]],
      Age : [null,[Validators.required , Validators.max(60) , Validators.min(18)]],
      MobileNo :['',[Validators.required ,Validators.pattern('^[6-9]{1}[0-9]{9}$')]],
      AadhaarNo :['',[Validators.required , Validators.minLength(10)]],
      Password: ['',[Validators.required , Validators.pattern("^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$")]],
      ConfirmPassword:['', [Validators.required,Validators.pattern("^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$")]],
      Gender :['',[Validators.required]]
    });
  }
  users : User[];
  user : User;
  ngOnInit() {
    this.UserService.getAllUser().subscribe((userList: User[]) =>{
      this.users = userList;
      console.log(this.users);
  })}
  register(c:FormGroup){
    console.log(c.valid);
    console.log(c.value.userName);
    console.log(c.value.Age);
    console.log(c.value.AadhaarNo);
    console.log(c.value.Gender);
    const data : User ={
      UserId: 'anand1@gmail.com',
      UserName: c.value.userName,
      Age: c.value.Age,
      Password: c.value.Password,
      AadhaarNo: c.value.AadhaarNo,
      MobileNo: c.value.MobileNo,
      Gender: c.value.Gender,
      Slots: [],
      Members: []
    }

    this.UserService.insertUser(data).subscribe((user1: any) =>{
      console.log(user1);
    })
    // this.UserService.getById('1').subscribe((data: any)=>{
    //   console.log(data)
    // });
    if(this.UserReg.valid){
      this.router.navigate(['/login']);
    }
  }
}
