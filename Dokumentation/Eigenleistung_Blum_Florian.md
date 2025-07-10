# Verwaltung (Florian Blum – 1295085)

## Beschreibung
Die Seite „Import/Export“ lässt den Nutzer Decks in Dateien schreiben und herunterladen, sowie Dateien, in denen Decks gespeichert sind hochladen, um Decks zu importieren.

## Einbindung
Da Lerndecks in der Anwendung auf einen Benutzer beschränkt sind, bietet die Export/Import Seite eine Möglichkeit, Decks mit anderen Benutzern zu teilen, sodass Nutzer nicht jedes Deck selbst erstellen müssen.
Die Funktion zum Importieren wurde in einer einzelnen Komponente implementiert, damit sie einfach in der Startseite wiederverwendet werden konnte 

## Codeangabe

### Frontend:
- [/src/pages/Import/Import.tsx ](https://github.com/mohid-1311/Flashcards/blob/main/Frontend/src/pages/Import/Import.tsx)
- [/src/Components/ImportField/ImportField.tsx ](https://github.com/mohid-1311/Flashcards/blob/main/Frontend/src/Components/ImportField/ImportField.tsx)
- [/src/data.tsx : addDeckWithCards() ](https://github.com/mohid-1311/Flashcards/blob/main/Frontend/src/data.tsx#L184)
- [/src/data.tsx : getDeckByName() ](https://github.com/mohid-1311/Flashcards/blob/dfa5a3ff833eb12fb77426e4315a2b60127403d6/Frontend/src/data.tsx#L113)
### Backend:
- [/src/router/deck-router.ts](https://github.com/mohid-1311/Flashcards/blob/main/Backend/src/router/deck-router.ts)
- [/src/router/deck-router.ts : router.get() /names ](https://github.com/mohid-1311/Flashcards/blob/main/Backend/src/router/deck-router.ts#L30)

## Oberfläche
Die Seite und zugehörige Funktion sollten intuitiv bedienbar sein. Auf der linken Seite ist eine Liste der Decks des aktuellen Nutzers, wie auf der Verwalten-Seite. Durch Klicken kann ein Deck ausgewählt werden, das dann mit dem Exportieren-Button heruntergeladen werden kann. 

Für das Importieren kann man mehrere Dateien per Drag und Drop ein Dateifeld ziehen. Über den Leeren-Button können die Dateien gelöscht und das Importieren abgebrochen werden, und mit dem Importieren-Button werden die Dateien ausgelesen und als Decks hinzugefügt.

## Funktionsweise
Das fürs Exportieren ausgewählte Deck wird als useState gespeichert, sodass sich die Oberfläche automatisch aktualisiert. Das Deck wird zuerst in ein Blob-Objekt gespeichert, für welches mit URL.createObjectUrl eine URL erzeugt wird. Diese wird einem Html-Hyperlink-Element übergeben, welches danach sofort geklickt und gelöscht wird.

Zum Importieren werden abgelegte Dateien in einem useState gespeichert, um sie in einer Liste anzeigen zu können. Nach dem Klicken des Importieren-Buttons wird aus jeder Datei ein json-Objekt geparst. Mit der Methode isDeck() aus ImportField.tsx wird danach überprüft, ob es sich um ein valides Deck Objekt handelt. Danach wird das Objekt, falls es ein Deck ist, mit der Funktion addDeckWithCards() hinzugefügt. Die Überprüfung, ob das Deck oder die Karten schon existieren, findet dabei in der addDeckWithCards() Funktion statt.

## Entscheidungen
Wird ein Deck importiert, und der Nutzer hat bereits ein gleichnamiges Deck erstellt, so werden Karten, die noch nicht im vorhandenen Deck sind, hinzugefügt, es wird kein neues Deck erstellt.

Diese Entscheidung wurde getroffen, da sie sich natürlicher anfühlt als das Deck vollständig zu ignorieren. Außerdem erlaubt dies eine einfachere Zusammenführung von Karten aus zwei Decks in ein Deck.
