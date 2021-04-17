import { Usuario } from "./acesso/model/usuario.model";
import * as firebase from 'firebase';
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class AutenticacaoService {

    constructor(private router: Router) {}

    public tokenId: string;

    cadastrarUsuario(usuario: Usuario): Promise<any> {
        return firebase.default.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then(response => {
                delete usuario.senha;
                firebase.default.database().ref(`usuario_detalhes/${btoa(usuario.email)}`)
                    .set( usuario );
                return response;

            })
            .catch(reject => reject );
    }

    autenticar(email: string, senha: string): void {
        firebase.default.auth().signInWithEmailAndPassword(email, senha)
            .then(response => {
                firebase.default.auth().currentUser.getIdToken().then(value => {
                    this.tokenId = value;
                    localStorage.setItem('tokenId', value);
                    this.router.navigate(['/home']);
                  }).catch(error => console.log(error));
            }).catch(response => console.log(response));
    }

    public autenticado(): boolean {
        let result =  !!this.tokenId || !!localStorage.getItem('tokenId');

        if(!result)
            this.router.navigate(['/']);

        return result;
    }

    public sair(): void {
        firebase.default.auth().signOut()
            .then(()=> {
                localStorage.removeItem('tokenId');
                this.tokenId = null;
                this.router.navigate(['/']);
            })
    }

}