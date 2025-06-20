#  Shop-Projekt mit React, Fastify und MongoDB

##  Projekt-Setup

Um das System lokal auszuführen, nutze folgende Befehle:

```bash
docker-compose build
docker-compose up
```
## Projektstruktur

Das System besteht aus drei zentralen Diensten, die gemeinsam eine vollständige Webanwendung ergeben:

# Frontend: React
Verzeichnis: frontend/
Dient als Benutzeroberfläche.
Kommuniziert über HTTP mit dem Backend.
Entwickelt mit React (JavaScript/TypeScript).
Wird über Port 3000 bereitgestellt.
# Backend: Fastify (Node.js)
Verzeichnis: backend/
Implementiert REST-Endpunkte.
Verarbeitet Geschäftslogik, Validierung und Datenzugriffe.
Nutzt Fastify als leichtgewichtiges und schnelles Framework.
Standard-Port: 8080.
# Datenbank: MongoDB
Bereitgestellt als Container.
Speichert persistente Daten wie Produkte, Nutzerinformationen etc.
Kommuniziert mit dem Backend über das MongoDB-Protokoll.
# Docker-Setup
docker-compose.yml orchestriert die Dienste.
Umgebungsvariablen werden über .env-Dateien geladen.

# Architektur – Verteilte Systeme

Die Anwendung ist als verteiltes System aufgebaut. Die einzelnen Komponenten arbeiten unabhängig und kommunizieren über Netzwerk-Schnittstellen. Vorteile dieses Ansatzes:

Unabhängige Entwicklung einzelner Module
Skalierbarkeit je nach Lastbedarf (z. B. Backend mehrfach starten)
Austauschbarkeit und einfache Wartung einzelner Teile
Fehlertoleranz durch Entkopplung der Services

## 🧱 Prinzipien moderner Webanwendungen (12-Factor App)

Dieses Projekt orientiert sich an etablierten Konzepten zur Entwicklung cloudnativer Anwendungen. Die folgenden Prinzipien wurden dabei berücksichtigt:

- **Einheitlicher Codebestand**  
  Die gesamte Anwendung liegt in einem gemeinsamen Git-Repository und kann versioniert verwaltet werden.

- **Klare Abhängigkeitsverwaltung**  
  Alle benötigten Pakete sind in `package.json`-Dateien definiert – sowohl für das Backend als auch für das React-Frontend.

- **Konfigurationsmanagement über Umgebungsvariablen**  
  Einstellungen wie Verbindungs-URIs oder Ports werden nicht im Code hinterlegt, sondern über `.env`-Dateien bzw. Docker konfiguriert.

- **Externe Services als ausgelagerte Komponenten**  
  Die MongoDB-Datenbank wird als eigenständiger Dienst behandelt und kann flexibel ausgetauscht oder ersetzt werden.

- **Trennung von Build und Ausführung**  
  Mit Docker wird der Buildprozess losgelöst von der Laufzeitumgebung gehandhabt – sauber getrennte Phasen für mehr Kontrolle.

- **Zustandslose Prozesse**  
  Sowohl das Frontend als auch das Backend sind so konzipiert, dass sie ohne lokalen Zustand auskommen und jederzeit neu gestartet werden können.

- **Standardisierte Schnittstellen über HTTP**  
  Die Services kommunizieren über definierte Ports – z. B. 3000 für das React-Frontend, 8080 für das Fastify-Backend.

- **Parallele Ausführung und Skalierung**  
  Es ist möglich, mehrere Instanzen einzelner Dienste gleichzeitig zu betreiben, etwa zur Lastverteilung.

- **Schnelles Starten und Stoppen**  
  Die Container sind so konzipiert, dass sie innerhalb weniger Sekunden hoch- oder heruntergefahren werden können.

- **Gleichheit zwischen Entwicklungs- und Produktionsumgebung**  
  Dank Containerisierung unterscheiden sich lokale Entwicklungsbedingungen kaum von denen in der Produktion.

- **Zentrales Logging**  
  Alle Dienste geben ihre Log-Ausgaben über den Standard-Output aus und lassen sich so einfach zentral erfassen.

- **Verwaltungstools als separate Prozesse**  
  Aufgaben wie Datenbankmigrationen oder Initialisierungen können unabhängig über separate Skripte im Container ausgeführt werden.



