import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  error:string='';  
  isloading:boolean=false;
  loginForm:FormGroup= new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]/)])
  })


  

  submitLoginForm (registerForm:FormGroup){
    this.isloading=true;
    this._AuthService.signin(registerForm.value).subscribe({
    next:(response)=>{
      this.isloading=false;
      if(response.message==='success'){
        localStorage.setItem('userToken',response.token)
        this._AuthService.saveUserData()
        this._Router.navigate(['./home'])
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
    this._AuthService.userData.subscribe({
      next:()=>{
        if(this._AuthService.userData.getValue()!=null)
        {
          this._Router.navigate(['./home'])
        }
      }
    })
    
  }
}
