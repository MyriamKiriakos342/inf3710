// import { Location } from "@angular/common";
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

    public constructor(private communicationService: CommunicationService, private router: Router) {
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
        this.router.navigateByUrl("ajout").catch(() => alert("Page introuvable"));
    }

    public accederDossiers(): void {
        this.router.navigateByUrl("animal").catch(() => alert("Page introuvable"));
    }
}