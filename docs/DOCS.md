TO DO - PRZEPISZĘ TO NA ANGIELSKI ZA JAKIŚ CZAS!

Struktura kodu:
src/
├── app/
│ ├── categories/
│ │ ├── page.tsx <-- Strona kategorii (lista kategorii)
│ │ ├── layout.tsx <-- Elementy globalne do /categories
│ │ ├── [category]/ <-- Dynamiczna kategoria
│ │ │ ├── page.tsx <-- Lista przepisów dla kategorii
│ │ │ ├── [recipe]/ <-- Dynamiczny przepis w kategorii
│ │ │ │ ├── page.tsx <-- Szczegóły konkretnego przepisu
│ ├── user/
│ │ ├── page.tsx <-- Strona usera (basic info póki co)
│ ├── layout.tsx <-- Layout globalny (nawigacja, stopka itd)
│ ├── globals.css <-- Globalne style
│ ├── page.tsx <-- Root aplikacji
