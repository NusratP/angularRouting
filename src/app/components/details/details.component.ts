import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { HousingService } from "src/app/services/housing.service";
import { HousingLocation } from "src/app/interfaces/housing-location";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-details",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
      <img class="listing-photo" [src]="housingLocation?.photo" />

      <section class="listing-description">
        <h2 class="listing-heading">{{ housingLocation?.name }}</h2>

        <p class="listing-location">
          {{ housingLocation?.city }},{{ housingLocation?.state }}
        </p>
      </section>
      <section class="listing-feature">
        <h2 class="section-heading">About the hosting location</h2>
        <ul>
          <li>Unit available: {{ housingLocation?.availableUnits }}</li>
          <li>Does this location have wifi: {{ housingLocation?.wifi }}</li>
          <li>
            Does this location have laundry: {{ housingLocation?.laundry }}
          </li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <button class="primary" type="button">Apply now</button>
      </section>
    </article>

    <p>details works! {{ housingLocation?.id }}</p>
  `,
  styleUrls: ["./details.component.css"],
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;

  housingLocationId = 0;

  constructor() {
    this.housingLocationId = Number(this.route.snapshot.params["id"]);
    this.housingLocation = this.housingService.getHousingLocationById(
      this.housingLocationId
    );
  }
}
