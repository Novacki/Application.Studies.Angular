import { Usuario } from "./acesso/model/usuario.model";
import * as firebase from 'firebase';

export class AutenticacaoService {
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
            .then(response => console.log(response))
            .catch(response => console.log(response));
0    }
}