# Dokumentation der Eigenleistung - Verwaltung

## 1. Beschreibung der Funktion
**Die Seite „Verwaltung“ ermöglich das Erstellen, Bearbeiten, Durchsuchen und Löschen von Karteikarten und Decks.**

## 2. Einbindung
Die Seite dient als essentielles Tool zur Verwaltung der eigenen Karteikarten(-decks) und ist schnell über die Navigationsleiste aufrufbar.

Die eingebettete Komponente zur Erstellung neuer Karteikarten wurde aus der „Hinzufügen“-Seite übernommen und erneut implementiert.

Die Kommunikation mit dem Backend erfolgt über eine REST-API. Wobei für die Verwaltung die Funktion „updateDeck()“ eigens implementiert wurde.

## 3. Ideen und Funktionsweise
Es wurde versucht, die Seite so intuitiv und praktisch, aber gleichzeitig so minimalistisch, wie möglich zu gestalten. 

### 3.1 Decks-Liste
Auf der linken Seite ist eine Liste mit **allen verfügbaren Decks** des aktuellen Benutzers. _[ getDecks() ]_

Das erste Element dieser Liste ist zum **Hinzufügen eines neuen Decks**. Nach Eingabe des Namens (welcher, noch nicht vergeben, nicht leer und nicht aus unsichtbaren Zeichen bestehen darf) wird das neue Deck angelegt. _[ deckNameExists(), invalidInput(), addDeck() ]_

Am rechten Rand jedes Decks befindet sich ein X, welches durch doppeltes Klicken das entsprechende **Deck löscht**. _[ removeDeck() ]_

In der **Suchfunktion** können die **Decks gefiltert** werden. Falls ein Deck mit dem gesuchten (nach obigen Kriterien, gültigen) Namen nicht vorhanden ist, kann dieser durch den Klick auf das Hinzufügen-Element ganz oben automatisch übernommen werden. _[ deckMatchesSearchFilter() ]_

### 3.2 Karteikarten-Liste

Nach Auswahl eines Decks werden in der Mitte **alle Karteikarten **dessen** angezeigt**. _[ getDecks().map(cards) ]_

Auch hier ist das erste Element zum **Hinzufügen neuer Karteikarten**. Hierbei wurde die Komponente der „Hinzufügen“-Seite verwendet. _[ AddCardForm ]_

Zum **Löschen der Karteikarten** existiert hier analog zu den Decks ein X am rechten Rand der Karteikarten. _[ removeCard() ]_

Am oberen Rand befindet sich ebenfalls eine **Suchfunktion**. _[ cardMatchesSearchFilter() ]_

Links davon der Name des aktuellen Decks mit **Bearbeiten-Funktion**. Durch Klicken auf den Stift lässt sich der **Name des Decks anpassen**. _[ renameDeck ]_

### 3.3 Attribut-Liste

Auf der rechten Seite wird nach Auswahl einer **Karteikarte** die **Attribute (Term, Definition)** dieser angezeigt. Die Schreibfelder lassen sich beliebig skalieren und nach Ändern des Inhalts per Schaltfläche aktualisieren. _[ updateCard() ]_

### 3.4 Allgemeines

Bei allen Aktionen wird die Seite **automatisch** auf die **aktuellsten Änderungen gesetzt**. 

Zur schnelleren Bedienung **unterstützen alle eigenen Eingabefelder die Tastatureingaben**:
- „Escape“ zum Verwerfen der Änderungen 
- „Enter“ / “Shift + Enter“ (bei den Attributen) zum Bestätigen der Änderungen.

## 4. Entscheidungen
Die Verwendung des **zweifachen Klicks** zum Löschen von Karteikarten / Decks kam als Idee, um ein **schnelleres Arbeiten** in der Verwaltung zu ermöglichen.

Eine spontane Entscheidung aufgrund eines **Problems** gab es beim Verknüpfen des Front- mit dem Backend, da anfänglich das Bearbeiten der Attribute über „useState“ zu einem direkten Aktualisieren der Karte geführt hat. Die erste Idee war die Verwendung eines „WebSockets“, was an sich auch reibungslos funktioniert hat, jedoch beim Hosting des Backends auf Probleme stieß und daher durch eine Schaltfläche zum Aktualisieren ersetzt wurde.

## Codeangabe
**Allgemein:**
- [Flashcards_MySQL.sql](https://github.com/mohid-1311/Flashcards/blob/main/Flashcards_MySQL.sql)
- [setup.sh](https://github.com/mohid-1311/Flashcards/blob/main/setup.sh)

**Frontend:**
- [Frontend/src/pages/Management/Management.tsx](https://github.com/mohid-1311/Flashcards/blob/main/Frontend/src/pages/Management/Management.tsx)
- [Frontend/src/data.tsx: updateDeck()](https://github.com/mohid-1311/Flashcards/blob/main/Frontend/src/data.tsx#L7)

**Backend:**
- [Backend/src/app.ts](https://github.com/mohid-1311/Flashcards/blob/main/Backend/src/app.ts)
- [Backend/src/server.ts](https://github.com/mohid-1311/Flashcards/blob/main/Backend/src/server.ts)
- [Backend/src/router/deck-router.ts: router.put()](https://github.com/mohid-1311/Flashcards/blob/main/Backend/src/router/deck-router.ts#L37)
- [Backend/tests/deckRouter.test.ts](https://github.com/mohid-1311/Flashcards/blob/main/Backend/tests/deckRouter.test.ts)


_Moritz Czekalski (Matrikel-Nr. 6851830)_