import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressoService {

  public status: Subject<string> = new Subject();
  public estado: Subject<any> = new Subject(); 
  
  constructor() { }
}
