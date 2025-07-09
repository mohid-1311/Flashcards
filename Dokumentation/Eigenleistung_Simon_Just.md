# **Dokumentation der Eigenleistung – Simon Just (1527218)**

## **Beschreibung der Funktion:**

Ich dokumentiere Funktion des „klassischen Lernmodus“. Hierbei kann der Benutzer mit einem zuvor angefertigten/importierten Deck, seine Karteikarten lernen. Dabei soll ein Lerneffekt nach dem klassischen Karteikartenprinzip erzielt werden. Demnach sollen Karten, die schon gut gelernt wurden nicht so häufig drankommen wie Karten, die oft falsch beantwortet werden. Dieser Wert der Relevanz (Gewicht) soll zu jeder einzelnen Karte in der Datenbank gespeichert werden.


## **zugrundeliegende Ideen und die Funktionsweise:**

Zu jeder Karte wird ein Gewicht (weight) gespeichert. Dieser Wert wird benutzt um zu errechnen, zu welcher Wahrscheinlichkeit welche Karte als nächstes gelernt wird. Beim erstellen einer Karte ist dieser Wert 10 und wird angepasst, je nach dem, ob die Karte richtig beantwortet wird. Ob eine Karte richtig beantwortet wurde muss der Nutzer selbst entscheiden und über die Buttons „richtig“ oder „falsch“ eingeben. Zudem kann er extra noch angeben, ob er diese Frage als schwierig empfunden hat, was ebenfalls in das Gewicht mit einfließt.
Wenn der Wert entsprechend der Eingabe verändert werden soll, wird die asynchrone Funktion updateCard, in aufgerufen. Diese schickt das neue Gewicht an das Backend, wo eine PUT-Anfrage an die Datenbank geschickt wird, was die Karteikarte aktualisiert. Die updateCard-Funktion wurde allgemein gehalten, damit sie auch von anderen Seiten benutzt werden kann und nicht nur um das Gewicht anzupassen. In dem body der Anfrage werden alle zu aktualisierende Parameter aus dem Interface „Card“ übergeben, außer die Deck-ID und Karten-ID, welche unveränderlich sein sollen.

Anschließend wird der Index der nächsten Karte ausgesucht. Dies passiert nach dem Prinzip der 
„Roulette-Wheel-Selection“. Also einer zufälligen Auswahl aber mit unterschiedlichen hohen Wahrscheinlichkeiten. Hierfür wird für jede Karte der Kehrwert des Gewichts genommen, damit Karten die ein kleineres „weight“ haben häufiger drankommen. Dann wird die Summe dieser Werte gebildet und mit einem zufälligen Wert von 0 bis 1 multipliziert. Damit ist die Zufallszahl jetzt von 0 bis zur Summe der Kehrwerte der Gewichte. Anschließend werden diese Kehrwerte der Gewichte so lang aufsummiert bis das Intervall gefunden wurde, in dem die Zufallszahl liegt. Hierbei wird darauf geachtet, dass der neue Index nicht dem alten entspricht, sofern mehrere Karten im Deck sind.


## **Angabe des entwickelten Codes:**

Der Code ist zu finden unter 
Frontend > src > pages > LearningModes > ClassicMode.tsx
Frontend > src > pages > LearningModes > ClassicMode.module.css
Frontend > src > data.tsx (function updateCard)
Backend > src > router > card-router.ts (router.put)


## **Probleme:**

Da die Funktion anfangs nicht gut durchdacht war und erst relativ spät, als das meiste vom Frontend schon stand implementiert wurde, gab es einige Probleme. Da „weight“ bis dorthin noch nicht im Type-Alias „Card“ vorhanden war, welcher von quasi jeder Funktion genutzt wurde, kam es bei der Einführung zu einigen Mergekonflikten und Unstimmigkeiten, die behoben werden mussten.