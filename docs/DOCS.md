TO DO - PRZEPISZĘ TO NA ANGIELSKI I NORMALNE .MD ZA JAKIŚ CZAS!

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
│ ├── cart/
│ │ ├── page.tsx <-- Strona koszyka
│ ├── user/
│ │ ├── page.tsx <-- Strona usera (basic info póki co)
│ ├── layout.tsx <-- Layout globalny (nawigacja, stopka itd)
│ ├── globals.css <-- Globalne style
│ ├── page.tsx <-- Root aplikacji

Nazewnictwo branchy:
Stosujcie się do nazywania branchy spójnie, czyli:
feature/
bugfix/
hotfix/
docs/
refactor/
itd.

Piszcie docsy, gdy dodajecie jakiegoś hooka, utilsa itd. - to jest ważne.
W każdej PR'ce dodawajcie pattern:
Goal: opis co należało osiągnać
What has been made: opis co zrobiliście
What needs to be done: opis, co trzeba dodać, bo np. mieliście blocker, nie wiedzieliście jak itd.
What next: jeśli taka jest potrzeba, co należy zrobić dalej

Rozbijajcie taski na możliwe najmniejsze kawałki, jeśli dany task jest czymś trudnym.

Koniecznie dodawajcie description w taski, jak nie chce się Wam pisać, to nawet wrzućcie to w Chat GPT, ale oby było cokolwiek. Taski typu tylko tytuł totalnie odpadają, ewentualnie mogą być wrzucone w momencie, gdy zadanie jest proste jak budowa cepa (która wcale prosta nie jest, sprawdźcie sobie wikipedie), czyli na przykład: "Add return button under the logo" - to jest zadanie, które wszystko tłumaczy, ale np. "Add user options" już moim zdaniem tłumaczy dosłownie nic.

Jeżeli zakładacie jakiś task, który chcecie aby się pojawił i macie pomysł czego użyć, to możecie na dole dodać jakieś linki do bibliotek - mi to się przyda w szczególności.

No i generalne założenie jest takie, że robimy bez spiny, w swoim tempie, bo głównie to mamy się tu szkolić programować. Jak chcecie to możemy dodać też jakieś omówienia tasków (coś al'a sprint review), gdzie obgadamy najważniejsze rzeczy, co zostało zrobione, jak itd., może to też będzie fajną nauką posłuchać innych.

Aha. I przypominam, że apkę robimy mobile głównie. Skupiamy się na tym najbardziej, jak desktop wygląda... to już oddalmy gdzieś na kiedyś, nie robimy na siłę w nim syfu, ale nie przejmujemy się też jakoś bardzo. Aczkolwiek z shadcn, to pewnie i tak będzie wyglądał całkiem spoko.
