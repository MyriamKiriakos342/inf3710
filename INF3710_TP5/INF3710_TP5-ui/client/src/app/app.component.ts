import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Animal } from "../../../common/tables/Animal";
import { CommunicationService } from "./communication.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
    public route: string;
    public router: Router;

    public constructor(private communicationService: CommunicationService, location: Location, router: Router) {
        router.events.subscribe((val) => {
            location.path() !== "" ?
              this.route = location.path() :
              this.route = "";
          });
    }

    public animals: Animal[] = [];
    public ngOnInit(): void {
        this.communicationService.listen().subscribe((m: any) => {
            console.log(m);
        });
    }

    public createDB(): void {
        this.communicationService.setUpDatabase().subscribe((res: any) => {
            console.log(res);
        });
    }

    public accederAjouter(): void {
        this.router.navigateByUrl("").catch(() => alert("Page introuvable"));();
    }

    public accederDossiers(): void {
        
    }
}