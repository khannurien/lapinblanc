import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject, Subject, Subscription } from 'rxjs';

import { IStarRootObject } from '../models/star.interface';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class StarService {
  private api = 'https://data.explore.star.fr/api/records/1.0/search';

  private vehiclesPositionSubject: BehaviorSubject<IStarRootObject>;
  vehiclesPosition$: Observable<IStarRootObject>;

  constructor(private http: HttpClient) {
    this.vehiclesPositionSubject = new BehaviorSubject({} as IStarRootObject);
    this.vehiclesPosition$ = this.vehiclesPositionSubject.asObservable();
  }

  updateVehiclesPosition(): Observable<IStarRootObject> {
    return this.getVehiclesPosition().pipe(
      tap(
        result => this.vehiclesPositionSubject.next(result)
      )
    );
  }

  getVehiclesPosition(): Observable<IStarRootObject> {
    return this.http.get<IStarRootObject>(`
      ${this.api}/?dataset=tco-bus-vehicules-position-tr&q=&rows=-1&sort=idbus&facet=numerobus&facet=nomcourtligne&facet=sens&facet=destination
    `);
  }
}
