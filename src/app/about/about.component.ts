import { Component } from "@angular/core";
import {
  RouterExtensions,
  NativeScriptCommonModule,
} from "@nativescript/angular";
import { NO_ERRORS_SCHEMA } from "@angular/core";

@Component({
  selector: "ns-about",
  standalone: true,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  template: `
    <ActionBar title="About">
      <NavigationButton
        text="Back"
        android.systemIcon="ic_menu_back"
        (tap)="onBack()"
      ></NavigationButton>
    </ActionBar>
    <StackLayout class="p-20" verticalAlignment="center">
      <StackLayout class="card text-center">
        <Label text="Scan Inventory" class="h1 m-b-5 text-center"></Label>
        <Label text="Version 1.0.0" class="small text-center m-b-20"></Label>
        <Label
          text="Simple inventory management app built with NativeScript and Angular."
          class="body text-center"
          textWrap="true"
        ></Label>
      </StackLayout>
    </StackLayout>
  `,
})
export class AboutComponent {
  constructor(private router: RouterExtensions) {}

  onBack() {
    this.router.back();
  }
}
