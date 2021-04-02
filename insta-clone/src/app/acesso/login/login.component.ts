import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  @Output() public register: EventEmitter<boolean> = new EventEmitter<boolean>()

  ngOnInit(): void {
  }

  public isRegister(): void {
    this.register.emit(true)
  }
}
