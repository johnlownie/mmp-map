import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { icon, Marker } from 'leaflet';

import { FearModel } from 'src/app/models/fear.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {

  private map;
  private fears: FearModel[];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.setMapIcon();

    this.dataService.getFears().subscribe(data => {
      this.fears = data;
      this.addFearsToMap();
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 50.090757, -85.030497 ],
      zoom: 5
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  private addFearsToMap(): void {
    this.fears.forEach((fear) => {
      console.log("Setting marker at " + fear.long + " - " + fear.lat);
      let marker = L.marker([fear.long, fear.lat]).addTo(this.map);
      marker.bindPopup("<b>Dear " + fear.representative + "</b><br/>" + fear.answer);
    });
  }

  private setMapIcon() {
    const iconRetinaUrl = 'assets/marker-icon-2x.png';
    const iconUrl = 'assets/marker-icon.png';
    const shadowUrl = 'assets/marker-shadow.png';
    const iconDefault = icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });

    Marker.prototype.options.icon = iconDefault;
  }

}
