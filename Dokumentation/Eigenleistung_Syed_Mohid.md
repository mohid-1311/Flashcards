# **Dokumentation der Eigenleistung - Flashcards Webanwendung**
## **1. Überblick**
Im Rahmen des Moduls Webengineering habe ich gemeinsam mit drei weiteren Kommilitonen eine Flashcards-Webanwendung entwickelt. Ziel des Projekts war es, eine Plattform zu entwickeln, mit der Benutzer Lernkarten (Flashcards) in Form von Decks erstellen, verwalten und lernen können.

Diese Dokumentation beschreibt ausschließlich meine Eigenleistung innerhalb des Gesamtprojekts. Diese umfasst sowohl Frontend-Komponenten als auch vollständige Backend-Endpunkte zur Verwaltung von Daten.

## **2. Technologien**
- **Frontend:** React mit TypeScript, CSS Modules
- **Backend:** Node.js mit Express, Drizzle ORM, MySQL
## **3. Frontend-Funktionalitäten**
### **3.1 Add.tsx - zentrale Steuerung der Komponenten** 
Add.tsx ist die übergeordnete Komponente, die sowohl DeckModal.tsx als auch AddCardForm.tsx integriert und steuert. Sie ist die Hauptseite zum Erstellen neuer Karteikarten und koordiniert die Interaktion zwischen den UI-Komponenten und dem Backend.
#### **Hauptverantwortungen:**
- Verwaltung des aktiven Decks (deckIndex)
- Laden und Aktualisieren aller Decks (über getDecks() aus data.tsx)
- Übergeben der Callback-Funktion onAddCard an AddCardForm, die dann addCard() ausführt
- Öffnen und Schließen des DeckModal
#### **Ablauf beim Erstellen einer Karte:**
1. Benutzer klickt auf „Stapel auswählen“ → öffnet DeckModal
1. Auswahl eines bestehenden Decks oder Eingabe eines neuen Decknamens -deckIndex wird gesetzt
1. Eingabe der Kartendaten in AddCardForm.tsx
1. Beim Klick auf „Karteikarte erstellen“ wird onAddCard() ausgeführt
1. Die Karte wird per addCard() an das Backend geschickt und gespeichert
1. Das Formular wird geleert und loadDecks() erneut ausgeführt, um die Änderungen sichtbar zu machen
### **3.2 DeckModal.tsx - Deck auswählen und hinzufügen**
Die Komponente DeckModal.tsx erlaubt es Benutzer, ein bestehendes Deck auszuwählen oder ein neues Deck zu erstellen. Sie wird innerhalb von Add.tsx verwendet, wenn der Button "Stapel auswählen" gedrückt wird.
#### **Aufbau und Ablauf**
1. Beim Öffnen wird eine Liste aller Decks über die Funktion getDecks() aus data.tsx geladen.
1. Die Decknamen werden gefiltert und im UI gerendert.
1. Ein Klick auf ein Deck setzt den deckIndex, der an Add.tsx übergeben wird.
1. Gibt der Benutzer einen neuen Decknamen ein, wird dieser über addNewDeck() verarbeitet:
   1. Der Name wird geprüft (ob leer oder bereits vorhanden).
   1. Falls gültig, wird im Backend ein neues Deck angelegt (via addDeck() aus data.tsx).
   1. Anschließend wird reloadDecks() aufgerufen, um die UI zu aktualisieren.
#### **Kommunikation:**
- Das Hinzufügen eines Decks ruft eine POST-Anfrage an den Endpunkt /decks im Backend auf.
- Bei Erfolg wird der neue Deckname lokal gespeichert und angezeigt.
### **3.3 AddCardForm.tsx - Karte zu Deck hinzufügen**
AddCardForm.tsx stellt ein Formular dar, mit dem man neue Karten (bestehend aus Begriff und Definition) zu einem Deck hinzufügen kann.
#### **Ablauf:**
1. Benutzer füllt die Felder aus und klickt auf "Karteikarte erstellen"
1. Die Funktion onAddCard wird mit dem neuen Kartendatensatz aufgerufen
1. Diese Funktion (bereitgestellt von Add.tsx) ruft addCard() aus data.tsx auf
1. addCard() sendet eine POST-Anfrage an /cards im Backend
1. Bei Erfolg wird die UI aktualisiert und die neue Karte angezeigt
### **3.4 Login.tsx & LoginComp.tsx**
Diese Komponenten realisieren die Nutzeranmeldung. Die Benutzerdaten (Name + Passwort) werden lokal eingegeben und über getUser() aus data.tsx im Backend abgefragt.
#### ***Ablauf:***
1. Benutzer gibt Name + Passwort ein
1. Die Funktion getUser() ruft den Endpunkt /users/:username auf
1. Das Passwort wird mit bcrypt.compare() validiert
1. Bei Erfolg wird der User redirected zur Startseite
### **3.5 SignupComp.tsx - Registrierung**
Ermöglicht neue Benutzerkonten:

- Passwort wird mit bcrypt.hash() verschlüsselt
- Neue Benutzer werden via addUser() über POST /users im Backend gespeichert
#### **Validierungen:**
- Doppelte Benutzernamen werden erkannt (via getUser())
- Passwort und Wiederholung müssen übereinstimmen
## **4. Backend-Funktionalität: Delete-Funktionen**
Ich habe zwei vollständige **DELETE-Funktionen** für das Projekt umgesetzt:

- **deleteCard** zum Entfernen einzelner Karteikarten
- **deleteDeck** zum Löschen eines kompletten Decks

Diese Funktionen bestehen jeweils aus einem Frontend-Aufruf, einer Datenzugriffslogik in data.tsx, einer REST-API-Route im Backend und dem dazugehörigen Datenbankzugriff via drizzle.
### **4.1 Datenlogik in data.tsx**
In der Datei data.tsx befinden sich die Funktionen:

- deleteCard(cardId: number)
- deleteDeck(deckId: number)

Beide senden einen HTTP-DELETE-Request an das Backend.

### **4.2 Verwendete Routen im Backend**
- 🔹 **Deck löschen**:\
  ` `DELETE /decks/:user\_name/:id\
  ` `→ Löscht ein Deck anhand von Benutzername und eindeutiger Deck-ID
- 🔹 **Karte löschen**:\
  ` `DELETE /cards/:cardid\
  ` `→ Entfernt eine Karte anhand ihrer eindeutigen Karten-ID

Diese Routen sind REST-konform und vermeiden Probleme mit nicht-eindeutigen Namen.
### **4.3 Ablauf beim Löschen eines Decks**
1. Der Benutzer klickt in Management.tsx auf „Deck entfernen“.
1. Die Funktion deleteDeck() wird aufgerufen.
1. Es wird ein DELETE-Request an /decks/:user\_name/:id gesendet.
1. Im Backend wird der Datenbankeintrag per db.delete(decks) gelöscht.
### **4.4 Ablauf beim Löschen einer Karte**
1. Der Benutzer klickt in Management.tsx auf das Entfernen-Icon einer Karte.
1. Die Karten-ID wird an deleteCard(cardId) übergeben.
1. Diese Funktion sendet einen DELETE-Request an /cards/:cardid.
1. Im Backend wird die Karte mit db.delete(cards) entfernt.
## **5. Einbindung in das Gesamtprojekt**
Meine Komponenten wurden so entwickelt, dass sie klar modular und mit anderen Komponenten kompatibel sind:

- DeckModal kommuniziert mit Add.tsx über Props und Callbacks
- Über setDeckIndex() wird zentral gesteuert, welches Deck aktiv ist
- AddCardForm wird von Add.tsx und Verwaltung.tsx genutzt

Meine Komponenten sorgen so dafür, dass im gesamten Projekt ein wiederverwendbarer, verständlicher und wartbarer Aufbau entsteht, der sich problemlos in andere Teile des Systems integrieren lässt.
## **6. Codeangabe**
**Frontend:**

- [Add.tsx](https://github.com/mohid-1311/Flashcards/blob/a4604d76c3e4734efca1ceacff3acf857f960e8b/Frontend/src/pages/Add/Add.tsx#L1-L112)
- [Login.tsx](https://github.com/mohid-1311/Flashcards/blob/a4604d76c3e4734efca1ceacff3acf857f960e8b/Frontend/src/pages/Login/Login.tsx#L1-L17)
- [DeckModal.tsx](https://github.com/mohid-1311/Flashcards/blob/a4604d76c3e4734efca1ceacff3acf857f960e8b/Frontend/src/Components/DeckModal/DeckModal.tsx#L1-L124)
- [AddCardToForm.tsx](https://github.com/mohid-1311/Flashcards/blob/a4604d76c3e4734efca1ceacff3acf857f960e8b/Frontend/src/Components/AddCardForm/AddCardForm.tsx#L1-L81)
- [LoginComp.tsx](https://github.com/mohid-1311/Flashcards/blob/a4604d76c3e4734efca1ceacff3acf857f960e8b/Frontend/src/Components/AddCardForm/AddCardForm.tsx#L1-L81)
- [SignupComp.tsx](https://github.com/mohid-1311/Flashcards/blob/a4604d76c3e4734efca1ceacff3acf857f960e8b/Frontend/src/Components/Signup/SignupComp.tsx#L1-L66)

**Backend:**

- [Data.tsx](https://github.com/mohid-1311/Flashcards/blob/a4604d76c3e4734efca1ceacff3acf857f960e8b/Frontend/src/data.tsx#L284-L329) - deleteCard und deleteDeck
- [DeckRouter](https://github.com/mohid-1311/Flashcards/blob/a4604d76c3e4734efca1ceacff3acf857f960e8b/Backend/src/router/deck-router.ts#L99-L120) – Delete Endpunkt
- [CardRouter](https://github.com/mohid-1311/Flashcards/blob/a4604d76c3e4734efca1ceacff3acf857f960e8b/Backend/src/router/card-router.ts#L71-L94) – Delete Endpunkt
## **7. Fazit**
Durch die Umsetzung der Komponenten und Endpunkte habe ich die vollständige Funktionalität für das Erstellen, Anzeigen und Löschen von Lerninhalten geschaffen. Besonders wichtig war mir die saubere Trennung von Logik und Darstellung, sowie eine robuste API-Anbindung mit konsistenter Fehlerbehandlung.

Die Aufgaben waren eng mit den Arbeiten meiner Teammitglieder verzahnt. Durch eine gute Absprache bei der API-Gestaltung und der Zuständigkeiten konnten wir die Module klar trennen, aber dennoch effizient zusammenführen.

Name: Mohid Syed Matrikelnummer: 5415283
