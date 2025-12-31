# NativeScript Inventory App

Aplikacja mobilna do zarządzania stanem magazynowym (inwentaryzacja), tworzona w technologii NativeScript z wykorzystaniem frameworka Angular. Aplikacja posiada obecnie podstawowy interfejs UI i logikę lokalną. Funkcje natywne i komunikacja z API są w trakcie implementacji.

## Obecna Funkcjonalność

Aplikacja w obecnej wersji umożliwia przeglądanie i zarządzanie stanem magazynowym w trybie offline (dane symulowane w pamięci):

1.  **Lista Inwentarza (Ekran Główny):**
    - Wyświetla listę produktów z nazwą, kodem i statusem dostępności.
    - Wizualne rozróżnienie statusów (kolor zielony dla "In Stock", pomarańczowy dla innych).
    - Obsługa nawigacji do szczegółów po kliknięciu w element.

2.  **Szczegóły Produktu:**
    - Pełny widok informacji o produkcie (opis, kod, status).
    - **Akcje edycji:** Możliwość zmiany statusu ("In Stock" / "Low Stock") za pomocą przycisków.
    - **Usuwanie:** Funkcja usuwania produktu z listy.
    - Nawigacja powrotna do listy głównej.

3.  **Technikalia:**
    - Dane są przechowywane w serwisie `InventoryService` (resetują się po restarcie aplikacji).
    - Interfejs zbudowany w oparciu o **Tailwind CSS**.

## Plan Rozwoju

W kolejnych wersjach aplikacji planowane jest wdrożenie następujących modułów:

- **Dodawanie Produktów:** Formularz umożliwiający wprowadzanie nowych pozycji do magazynu.
- **Integracja z kamerą:** Możliwość dodawania zdjęć do produktów lub skanowania kodów.
- **Backend API:** Synchronizacja danych z serwerem (pobieranie i zapisywanie stanu magazynowego).
- **Zarządzanie błędami:** Obsługa braku sieci oraz uprawnień systemowych.

## Technologie

- **Framework:** NativeScript + Angular
- **Style:** Tailwind CSS
- **Język:** TypeScript

## Uruchomienie projektu

Aby uruchomić aplikację w trybie deweloperskim:

```bash
npm install
ns run android
```
