import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Instagram';


  ngOnInit(): void {
    let firebaseConfig = {
      apiKey: "AIzaSyB0NkPOTPAfcU-81wMfHgDX2N2OAjgk5lc",
      authDomain: "instagram-clone-67d98.firebaseapp.com",
      projectId: "instagram-clone-67d98",
      storageBucket: "instagram-clone-67d98.appspot.com",
      messagingSenderId: "749569578668",
      appId: "1:749569578668:web:6b17257d217dbed11bf109",
      measurementId: "G-FMRET9QL1Y"
    };
    // Initialize Firebase
    firebase.default.initializeApp(firebaseConfig);
    firebase.default.analytics();
    
  }
}
