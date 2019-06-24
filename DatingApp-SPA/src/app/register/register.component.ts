import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Output() cancelRegister = new EventEmitter();

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  register(){
    console.log(this.model);
    this.authService.regiter(this.model).subscribe( 
      () => {
        console.log('registration successful');
      }, error => {
        console.log(error);
      });
  }

  cancel(){
    console.log('Cancel register');
    this.cancelRegister.emit(false);
  }
}
