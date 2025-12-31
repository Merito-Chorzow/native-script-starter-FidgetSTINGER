import { Component, OnInit } from "@angular/core";
import {
  RouterExtensions,
  NativeScriptCommonModule,
} from "@nativescript/angular";
import { InventoryService, Item } from "./inventory.service";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ItemEventData } from "@nativescript/core";

@Component({
  selector: "ns-inventory-list",
  standalone: true,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  template: `
    <ActionBar title="Scan Inventory">
      <ActionItem
        ios.position="right"
        android.position="actionBar"
        text="About"
        (tap)="onAbout()"
      ></ActionItem>
      <ActionItem
        ios.position="right"
        android.position="actionBar"
        text="Add"
        (tap)="onAdd()"
      ></ActionItem>
    </ActionBar>
    <GridLayout class="p-t-10">
      <ListView
        [items]="items"
        (itemTap)="onItemTap($event)"
        class="list-group"
        separatorColor="transparent"
        backgroundColor="transparent"
      >
        <ng-template let-item="item">
          <StackLayout class="card">
            <GridLayout columns="*, auto" rows="auto, auto">
              <Label col="0" row="0" [text]="item?.name" class="h2"></Label>
              <Label
                col="1"
                row="0"
                [text]="item?.code"
                class="small text-right"
              ></Label>
              <Label
                col="0"
                row="1"
                colspan="2"
                [text]="item?.status"
                class="body font-weight-bold m-t-5"
                [color]="item?.status === 'In Stock' ? '#16a34a' : '#ea580c'"
              ></Label>
            </GridLayout>
          </StackLayout>
        </ng-template>
      </ListView>
    </GridLayout>
  `,
})
export class InventoryListComponent implements OnInit {
  items: Item[] = [];

  constructor(
    private inventoryService: InventoryService,
    private router: RouterExtensions
  ) {}

  ngOnInit() {
    this.inventoryService.getItems().subscribe((items) => (this.items = items));
  }

  onItemTap(args: ItemEventData) {
    const index = args.index;
    const item = this.items[index];
    console.log("Navigating to detail for:", item.id);
    this.router.navigate(["/detail", item.id]);
  }

  onAdd() {
    console.log("Tapped Add");
    this.router.navigate(["/add"]);
  }
  onAbout() {
    console.log("Tapped About");
    this.router.navigate(["/about"]);
  }
}
