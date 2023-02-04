import { Component,OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  error:string='';  
  isloading:boolean=false;
  registerForm:FormGroup= new FormGroup({
    first_name:new FormControl(null,[Validators.required, Validators.minLength(3),Validators.maxLength(10)]),
    last_name:new FormControl(null,[Validators.required, Validators.minLength(3),Validators.maxLength(10)]),
    age:new FormControl(null,[Validators.min(16),Validators.max(90),Validators.required]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]/)])
  })


  

  submitRegisterForm (registerForm:FormGroup){
    this.isloading=true;
    this._AuthService.signUp(registerForm.value).subscribe({
    next:(response)=>{
      this.isloading=false;
      if(response.message==='success'){
        this._Router.navigate(['./login'])
      }
      else
      {
        this.error=response.message
      }
    }
  })
  }
  constructor(private _AuthService:AuthService , private _Router:Router){}
  ngOnInit(): void {
    
  }

}
