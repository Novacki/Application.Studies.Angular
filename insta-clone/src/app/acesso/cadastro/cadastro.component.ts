import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor() { }

  @Output() public login: EventEmitter<boolean> = new EventEmitter<boolean>();
  ngOnInit(): void {
  }

  public isLogin(): void {
    this.login.emit(false);
  }
  
}
