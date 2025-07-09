## **7. Dokumentation des Webdesigns**
### **7.1 Designziele und visuelle Strategie**
Ziel der Gestaltung war es, eine **lernfokussierte, reduzierte Benutzeroberfläche** zu schaffen, die auf allen Geräten funktioniert. Das Design sollte die Interaktion klar führen, ohne die Inhalte zu überlagern. Dafür wurden folgende Prinzipien umgesetzt:

- **Modularität**: Jede .tsx-Komponente besitzt eine eigene .module.css-Datei (z. B. DeckModal.module.css, Add.module.css) → Trennung von Darstellung und Logik
- **Responsives Verhalten** durch Flexbox/Grid, %-Breiten, min-width, max-width, Media Queries
- **Visuelles Feedback**: Hover- und Focus-Styles geben klare Rückmeldung bei Interaktionen
- **Konsistenz**: Gleichbleibende Farben, Fonts, Schaltflächen & Layoutabstände
- **Barrierefreiheit**: Fokus-Indikatoren, Farbkontraste, semantische HTML-Elemente
### **7.2 Typografie & Farben**
- **Typografie**: Serifenlose Schriftarten erhöhen die Lesbarkeit auf allen Geräten. Größenbereich liegt zwischen 1rem und 1.5rem
- **Farbschema**:
  - Blau (#007bff) als Primärfarbe für Handlungen (CTA-Buttons, Auswahl)
  - Grau-Töne für Hintergrund und Kontraste → klare Abgrenzung von Elementen
- Farben wurden **barrierefrei** gewählt (hoher Kontrast, z. B. zwischen Text und Hintergrund)
### **7.3 Konsistenz & Styleguide-Umsetzung**
- Gleicher Button-Stil über alle Module
- Farbsystem: Blau für Hauptaktionen
### **7.4 Beispielseite 1: Add.tsx mit DeckModal und AddCardForm**
Diese Seite vereint wichtige Interaktionen: Der Nutzer wählt oder erstellt ein Deck (DeckModal), fügt Inhalte hinzu (AddCardForm) und verwaltet den Deckzustand (Add.tsx).
#### **Visuelle Gestaltung:**
- Das Layout verwendet **Flexbox**, um die Hauptbereiche (Deckauswahl, Kartenformular) nebeneinander oder übereinander anzuordnen – je nach Bildschirmbreite.
- Buttons wie Stapel auswählen oder Karteikarte erstellen besitzen klare visuelle Affordanzen (Hervorhebung durch Farbe, Größe, Mouseover-Zustände)
- Die Modalbox hebt sich visuell durch box-shadow, padding und border-radius vom Hintergrund ab -> Strukturierung des Interface
#### **UX-Fokus:**
- Reduktion auf wichtigste Aktionen: Auswahl, Eingabe, Bestätigung
- Visuelles Trennen von Eingabe und Deckliste
### **7.5 Beispielseite 2: Login.tsx + LoginComp.tsx**
Ein klassisches Login-Formular, das sich **visuell auf die Eingabe konzentriert**.

**Umsetzung:**

- Das Formular ist **zentriert** per Flexbox (display: flex, justify-content: center)
- **Fokus-Indikatoren** bei Inputs (z. B. box-shadow, border-color) machen Eingaben **visuell erfassbar und barrierefrei**
- **Call-To-Action-Buttons (CTA)** wie „Login“ oder „Registrieren“ sind farblich hervorgehoben (#007bff) und besitzen Übergangseffekte (transition) bei Hover
- Validierung verhindert fehlerhafte Submits – nur gültige Eingaben aktivieren den Button

**Designprinzipien:**

- **Constraint-Prinzip**: Absenden nur möglich bei erfüllten Bedingungen
- **Feedback-Prinzip**: Visuelle Rückmeldung bei Fehlern und bei korrekten Eingaben
- **Konsistenz**: Gleiche Gestaltung für alle Formulareingaben in Login und Signup

### **7.6 Fazit**
Das Design der Anwendung folgt den Empfehlungen der Vorlesung konsequent. Es wurde darauf geachtet, dass Benutzerinteraktionen klar verständlich, vorhersehbar und visuell gestützt ablaufen.

Die UI bleibt trotz ihrer Funktionalität leichtgewichtig, erweiterbar und gut wartbar – mit CSS Modules als technische Grundlage und UX-Prinzipien als Leitlinie.
