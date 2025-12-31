import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { delay } from "rxjs/operators";

export interface Item {
  id: number;
  name: string;
  code: string;
  description: string;
  status: string;
}

@Injectable({ providedIn: "root" })
export class InventoryService {
  private items: Item[] = [
    {
      id: 1,
      name: "Laptop",
      code: "123456",
      description: "Dell XPS 15",
      status: "In Stock",
    },
    {
      id: 2,
      name: "Monitor",
      code: "789012",
      description: "LG UltraFine",
      status: "Low Stock",
    },
  ];

  getItems() {
    return of(this.items).pipe(delay(100));
  }

  getItem(id: number) {
    return of(this.items.find((i) => i.id === id)).pipe(delay(100));
  }

  addItem(item: Item) {
    item.id = this.items.length + 1;
    this.items.push(item);
    return of(item).pipe(delay(100));
  }

  updateItem(item: Item) {
    const index = this.items.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      this.items[index] = item;
    }
    return of(item).pipe(delay(500));
  }

  deleteItem(id: number) {
    this.items = this.items.filter((i) => i.id !== id);
    return of(true).pipe(delay(500));
  }
}
