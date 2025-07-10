# Vorbereitung der Entwicklungsumgebung
Alle Node-Pakete und Umgebungsvariablen können über das [Flashcards/setup.mjs](https://github.com/mohid-1311/Flashcards/blob/main/setup.mjs)-Script mit folgendem Befehl (`node setup.mjs`) automatisch eingerichtet werden.

In den generierten `.env`-Dateien gibt es die Wahl zwischen dem selbst gehosteten (Standard) und extern gehosteten Varianten.

> Für die Entwicklungsumgebung sind, abgesehen von `node, npm & Docker` keine weiteren Werkzeuge zwingend notwendig.
> - Zum Anzeigen der Datensätze in der MySQL Datenbank empfiehlt sich jedoch [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) zu installieren.

# Starten der Anwendung
Nach der erfolgreichen Einrichtung der Entwicklungsumgebung, kann die Datenbank zusammen mit dem Backend und Frontend über das [Flashcards/build+start.mjs](https://github.com/mohid-1311/Flashcards/blob/main/build%2Bstart.mjs)-Script mit folgendem Befehl (`node build+start.mjs`) automatisch gestartet werden.

Nach der Meldung `>>> Setup fertiggestellt! <<<`, sollte die Webseite über [`localhost`](http://localhost:80) erreichbar sein.