import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-traitement",
  templateUrl: "./traitement.component.html",
  styleUrls: ["./traitement.component.css"]
})
export class TraitementComponent implements OnInit {
  public longueurMax: number = 15;
  constructor() { }

  ngOnInit() {
  }

}
