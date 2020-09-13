import { Component, OnDestroy, OnInit } from '@angular/core';
import { take, takeUntil } from 'rxjs/operators';
import { circle, icon, latLng, LatLngTuple, marker, tileLayer } from 'leaflet';

import { StarService } from '@app/common/services/star.service';
import { Subject } from 'rxjs';
import { IStarRootObject } from './common/models/star.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'lapinblanc';

  mapOptions = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      })
    ],
    zoom: 13,
    center: latLng([48.11198, -1.67429])
  };

  mapLayers = [];

  data: IStarRootObject;

  private unsubscribe: Subject<IStarRootObject> = new Subject();
  private interval: any;

  constructor(private starService: StarService) {}

  ngOnInit(): void {
    this.refreshData();

    if (this.interval) {
      clearInterval(this.interval);
    }

    this.interval = setInterval(() => {
      this.refreshData();
      this.updateMap();
    }, 3000);

    this.starService.vehiclesPosition$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(data => this.data = data);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  refreshData(): void {
    this.starService.updateVehiclesPosition()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe();
  }

  updateMap(): void {
    this.mapLayers = this.data.records.map(
      record => marker([record.geometry.coordinates[1], record.geometry.coordinates[0]], {
        icon: icon({
          iconSize: [ 25, 41 ],
          iconAnchor: [ 13, 41 ],
          iconUrl: 'assets/marker-icon.png',
          shadowUrl: 'assets/marker-shadow.png'
        })
      })
    );

    console.log(this.mapLayers);
  }
}
