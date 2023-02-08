import { Component, OnInit } from '@angular/core';
import { IApiEndpoints } from '../models/api-endpoints';
import { IHitApi, RequestMethod } from '../models/global';
import { GlobalService } from '../services/global.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {

  songData :any;
  songForm: FormGroup;


  constructor(private globalService: GlobalService) { 
    this.songForm = new FormGroup({
      songName: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  this.getSongData()
  }

  getSongData() {
      const api: IHitApi = {
        url: `${IApiEndpoints.GET_SONG}`,
        requestMethod: RequestMethod.GET,
        input: {},
        response: (res: any) => {
          if(res.status===200){
            this.songData = res.result          
          }else{
            alert("No data found")
          }
        },
        errorFunction: (error: any) => {
          alert("Something went wrong")
        },
      };
      this.globalService.hitApi(api);
  }
  onSubmit(value: any) {
    if (this.songForm.valid) {
      const api: IHitApi = {
        url: `${IApiEndpoints.POST_SONG}`,
        requestMethod: RequestMethod.POST,
        input: {
          songName: this.songForm.controls['songName'].value,
        },
        response: (res: any) => {
          alert('Success');
          this.songForm.reset({});
          this.getSongData()
        },
        errorFunction: (error: any) => {
          alert("Something went wrong")
        },
      };
      this.globalService.hitApi(api);
    } else {
      alert('Invalid value');
    }
  }
}
