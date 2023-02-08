import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IApiEndpoints } from '../models/api-endpoints';
import { IHitApi, RequestMethod } from '../models/global';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private globalService: GlobalService) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(value: any) {
    if (this.loginForm.valid) {
      const api: IHitApi = {
        url: `${IApiEndpoints.LOGIN}`,
        requestMethod: RequestMethod.POST,
        input: {
          username: this.loginForm.controls['username'].value,
          password: this.loginForm.controls['password'].value,
        },
        response: (res: any) => {
          alert("Success")
          this.loginForm.reset({})
          this.globalService.navigate("/song");
        },
        errorFunction: (error: any) => {
          alert("Invalid user.")
        },
      };
      this.globalService.hitApi(api);
    } else {
      alert("Invalid value")
    }
  }
}
