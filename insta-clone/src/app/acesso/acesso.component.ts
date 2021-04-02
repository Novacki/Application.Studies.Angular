import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css'],
  animations: [
    trigger('banner-acesso', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({
          opacity: 0,
          transform: 'translate(-50px, 0px)'
        }),
        animate('500ms 0s ease-in-out')
      ])
    ]),
    trigger('painel-acesso', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({
          opacity: 0,
          transform: 'translate(50px, 0)'
        }),
        animate('1.5s 0s ease-in-out', keyframes([
          style({
            offset: 0.15, opacity: 1, transform: 'translateY(-200px)'
          }),
          style({
            offset: 0.25, opacity: 1, transform: 'translateY(200px)'
          }),
          style({
            offset: 0.45, opacity: 1, transform: 'translateX(200px)'
          }),
          style({
            offset: 0.85, opacity: 1, transform: 'translateX(-200px)'
          }),
          style({
            offset: 0.95, opacity: 1, transform: 'translateX(0px)'
          }),
        ]))
      ])
    ])
  ]
})
export class AcessoComponent implements OnInit {

  public animateState: string = 'criado';
  constructor() { }

  public statePanel: boolean = false;

  ngOnInit(): void {
  }

  public changeStatePanel(state: boolean): void {
    this.statePanel = state;
  }

  public initAnimate(event: any): void {
    console.log("Init: ", event);
  }

  public endAnimate(event: any): void {
    console.log("Done: ", event);
  }
}
