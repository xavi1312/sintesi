import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/serveis/auth/auth.service';

import {Router} from '@angular/router';

@Component({
  selector: 'app-inici-sessio',
  templateUrl: './inici-sessio.component.html',
  styleUrls: ['./inici-sessio.component.scss']
})
export class IniciSessioComponent implements OnInit {
  fomIniciSessio: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.fomIniciSessio = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      contrasenya: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
    })
  }

  enviar() {

    if (this.fomIniciSessio.invalid) {return}

    const form = {
      email : this.fomIniciSessio.controls['email'].value,
      contrasenya: this.fomIniciSessio.controls['contrasenya'].value
    }

    this.iniciSessio(form);
  }
  
  iniciSessio(form):void {
    this.authService.iniciSessio(form).subscribe(
      res => {
        this.authService.nouToken(res)
        this.router.navigateByUrl('');
      }
    )
  }
        
}
