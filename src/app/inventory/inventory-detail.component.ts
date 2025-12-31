import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  RouterExtensions,
  NativeScriptCommonModule,
} from "@nativescript/angular";
import { InventoryService, Item } from "./inventory.service";
import { NO_ERRORS_SCHEMA } from "@angular/core";

@Component({
  selector: "ns-inventory-detail",
  standalone: true,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  template: `
    <ActionBar title="Details">
      <NavigationButton
        text="Back"
        android.systemIcon="ic_menu_back"
        (tap)="onBack()"
      ></NavigationButton>
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <!-- Loading State -->
        <StackLayout *ngIf="loading" class="p-20" verticalAlignment="center">
          <ActivityIndicator busy="true" class="m-b-10"></ActivityIndicator>
          <Label text="Loading details..." class="body text-center"></Label>
        </StackLayout>

        <!-- Error State -->
        <StackLayout
          *ngIf="!loading && !item"
          class="p-20"
          verticalAlignment="center"
        >
          <Label
            text="Item not found"
            class="h2 text-center"
            color="#ef4444"
          ></Label>
          <Button
            text="Go Back"
            (tap)="onBack()"
            class="btn btn-secondary m-t-20"
          ></Button>
        </StackLayout>

        <!-- Content State -->
        <StackLayout class="p-20" *ngIf="!loading && item">
          <StackLayout class="card m-0 m-b-20">
            <Label [text]="item.name" class="h1 text-center m-b-5"></Label>
            <Label
              [text]="'Code: ' + item.code"
              class="small text-center m-b-15"
            ></Label>

            <StackLayout
              class="hr-light m-b-15"
              style="background-color: #e5e7eb; height: 1;"
            ></StackLayout>

            <Label text="Status" class="label"></Label>
            <Label
              [text]="item.status"
              class="body font-weight-bold m-b-15"
              [color]="item.status === 'In Stock' ? '#16a34a' : '#ea580c'"
            ></Label>

            <Label text="Description" class="label"></Label>
            <Label
              [text]="item.description"
              class="body"
              textWrap="true"
            ></Label>
          </StackLayout>

          <Label text="Actions" class="h2 m-b-10 m-l-5"></Label>
          <GridLayout columns="*, *" class="m-b-15" gap="10">
            <Button
              col="0"
              text="In Stock"
              (tap)="updateStatus('In Stock')"
              class="btn btn-primary"
            ></Button>
            <Button
              col="1"
              text="Low Stock"
              (tap)="updateStatus('Low Stock')"
              class="btn btn-secondary"
            ></Button>
          </GridLayout>

          <Button
            text="Delete Item"
            (tap)="onDelete()"
            class="btn btn-danger"
          ></Button>
        </StackLayout>
      </StackLayout>
    </ScrollView>
  `,
})
export class InventoryDetailComponent implements OnInit {
  item: Item | undefined;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private inventoryService: InventoryService,
    private router: RouterExtensions
  ) {}

  onBack() {
    this.router.back();
  }

  ngOnInit() {
    const id = +this.route.snapshot.params["id"];
    this.inventoryService.getItem(id).subscribe((item) => {
      this.item = item;
      this.loading = false;
    });
  }

  updateStatus(status: string) {
    if (this.item) {
      this.item.status = status;
      this.inventoryService.updateItem(this.item).subscribe(() => {
        alert("Status updated to " + status);
      });
    }
  }

  onDelete() {
    if (this.item) {
      this.inventoryService.deleteItem(this.item.id).subscribe(() => {
        this.router.back();
      });
    }
  }
}
