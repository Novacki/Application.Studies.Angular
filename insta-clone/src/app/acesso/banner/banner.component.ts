import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Imagem } from './model/imagem.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations: [
    trigger('banner',[
      state('escondido', style({
        opacity: 0
      })),
      state('visivel', style({
        opacity: 1
      })),
      transition('escondido <=> visivel', animate('2s ease-in'))
    ])
  ]
})
export class BannerComponent implements OnInit {

  public imagens: Imagem[] = [
    { estado:'visivel', url:'../../../assets/banner-acesso/img_1.png' },
    { estado:'escondido', url:'../../../assets/banner-acesso/img_2.png' },
    { estado:'escondido', url:'../../../assets/banner-acesso/img_3.png' },
    { estado:'escondido', url:'../../../assets/banner-acesso/img_4.png' },
    { estado:'escondido', url:'../../../assets/banner-acesso/img_5.png' },
  ]
  constructor() { }

  ngOnInit(): void {
    setTimeout(()=>{this.carregaImagem()}, 3000)
  }

  public carregaImagem(): void {
    let idx : number = 0;
    for(let i = 0; i < this.imagens.length; i++) {
      if( this.imagens[i].estado != 'visivel' )
        continue;

      this.imagens[i].estado = 'escondido'
      idx = i != 4 ? i + 1 : 0;
    }

    this.imagens[idx].estado = 'visivel';

    //Com o ForEach
    // this.imagens.forEach(imagem => {
    //   if(imagem.estado == 'visivel') {
    //     imagem.estado = 'escondido';
    //     idx = this.imagens.indexOf(imagem) + 1 != 4 ? this.imagens.indexOf(imagem) + 1 : 0;
    //   }
    // });

    // this.imagens[idx].estado = 'visivel';
    setTimeout(()=>{this.carregaImagem()}, 3000)
  }
}

