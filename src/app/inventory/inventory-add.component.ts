import { Component, NgZone } from "@angular/core";
import {
  RouterExtensions,
  NativeScriptCommonModule,
  NativeScriptFormsModule,
} from "@nativescript/angular";
import { InventoryService } from "./inventory.service";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { Device, Utils, isAndroid } from "@nativescript/core";

@Component({
  selector: "ns-inventory-add",
  standalone: true,
  imports: [NativeScriptCommonModule, NativeScriptFormsModule],
  schemas: [NO_ERRORS_SCHEMA],
  template: `
    <ActionBar title="Add Item">
      <NavigationButton
        text="Back"
        android.systemIcon="ic_menu_back"
        (tap)="onBack()"
      ></NavigationButton>
    </ActionBar>
    <ScrollView>
      <StackLayout class="p-15">
        <StackLayout class="card m-0 m-b-20">
          <Label text="Name" class="label"></Label>
          <TextField
            [(ngModel)]="name"
            class="input"
            hint="Enter item name"
          ></TextField>

          <Label text="Code" class="label"></Label>
          <TextField
            [(ngModel)]="code"
            class="input m-b-10"
            hint="Enter code manually"
          ></TextField>
          <Button
            text="Scan Barcode"
            (tap)="onScan()"
            class="btn btn-secondary m-b-15"
          ></Button>

          <Label text="Description" class="label"></Label>
          <TextField
            [(ngModel)]="description"
            class="input"
            hint="Enter description"
          ></TextField>
        </StackLayout>

        <Button
          text="Save Item"
          (tap)="onSave()"
          class="btn btn-primary"
        ></Button>
      </StackLayout>
    </ScrollView>
  `,
})
export class InventoryAddComponent {
  name = "";
  code = "";
  description = "";

  constructor(
    private inventoryService: InventoryService,
    private router: RouterExtensions,
    private zone: NgZone
  ) {}

  onBack() {
    this.router.back();
  }

  onScan() {
    // Pobranie informacji o urządzeniu (API natywne)
    const model = Device.model;
    const manufacturer = Device.manufacturer;

    // Generowanie kodu (wymóg funkcji natywnej)
    // Użycie NgZone dla odświeżenia widoku
    this.zone.run(() => {
      const randomCode = Math.floor(100000 + Math.random() * 900000);
      this.code = `${randomCode}`;
    });

    // Natywne powiadomienie (Toast)
    if (isAndroid) {
      const context = Utils.android.getApplicationContext();
      const text = "Scanned (Vibration + Code Generated): " + model;
      const duration = 0; // Toast.LENGTH_SHORT
      const toast = android.widget.Toast.makeText(context, text, duration);
      toast.show();

      // Natywna wibracja
      try {
        const vibrator = context.getSystemService(
          android.content.Context.VIBRATOR_SERVICE
        );
        if (vibrator) {
          (vibrator as any).vibrate(200);
        }
      } catch (e) {
        console.error("Vibration failed", e);
      }
    }
  }

  onSave() {
    if (!this.name || !this.code) {
      alert("Please fill name and code");
      return;
    }
    this.inventoryService
      .addItem({
        id: 0,
        name: this.name,
        code: this.code,
        description: this.description,
        status: "In Stock",
      })
      .subscribe(() => {
        this.router.back();
      });
  }
}
