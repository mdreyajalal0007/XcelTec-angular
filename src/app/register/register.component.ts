import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IApiEndpoints } from '../models/api-endpoints';
import { IHitApi, RequestMethod } from '../models/global';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private globalService: GlobalService) {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(value: any) {
    if (this.registerForm.valid) {
      const api: IHitApi = {
        url: `${IApiEndpoints.REGISTER}`,
        requestMethod: RequestMethod.POST,
        input: {
          username: this.registerForm.controls['username'].value,
          password: this.registerForm.controls['password'].value,
        },
        response: (res: any) => {
          alert('Success');
          this.registerForm.reset({});
        },
        errorFunction: (error: any) => {},
      };
      this.globalService.hitApi(api);
    } else {
      alert('Invalid value');
    }
  }
}
