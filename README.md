# QA Documentation Templates & Interactive Report Studio
> Production-grade QA engineering documentation templates, TestMo / Jira Xray CSV datasets, and interactive web studio for quality assurance professionals.
> 
> **Author:** Szymon Kochanowski  
> **License:** MIT License  
> **Repository:** `qa-documentation-templates`

---

## 🌍 Language / Język
* [English Description](#english)
* [Opis po Polsku](#polski)

---

<a name="english"></a>
## 🇬🇧 English Overview

This repository serves a dual purpose for modern Quality Assurance teams, SDETs, and Game QA professionals:
1. **Physical Engineering Templates (`/templates/`):** Ready-to-use, battle-tested templates formatted in Markdown (`.md`), industry-standard CSV for direct import into TestMo / TestRail / Jira Xray, and structured JSON datasets.
2. **Interactive Web Application (`src/`):** A modern React 19 + TypeScript + Tailwind CSS application providing an interactive Bug Report Builder (with live dual-pane Jira / Markdown / Slack formatters), Test Case & CSV Generator, Interactive Smoke Checklist with live pass-rate auditing, and a Template Explorer with one-click copy and downloads.

### 📁 Repository Structure & Template Catalog

| Category | File Path | Standard / Format | Description |
| :--- | :--- | :---: | :--- |
| **Game FQA** | [`templates/bug-reports/game-qa-bug-report.md`](templates/bug-reports/game-qa-bug-report.md) | Markdown (`.md`) | Game Functional QA bug report for PC, PS5, Xbox Series X, Switch 2 with repro rates (X/5), engine logs, and TRC/TCR compliance details. |
| **Web & REST API** | [`templates/bug-reports/web-api-bug-report.md`](templates/bug-reports/web-api-bug-report.md) | Markdown (`.md`) | RFC 9110 HTTP defect report template with cURL commands, status codes, JSON payloads, headers, and microservice trace IDs. |
| **Test Cases** | [`templates/test-cases/testmo-import-template.csv`](templates/test-cases/testmo-import-template.csv) | CSV (`.csv`) | 15 professional, ready-to-import test cases for TestMo / TestRail / Jira Xray covering console compliance, API security, and performance. |
| **Test Cases (JSON)** | [`templates/test-cases/testmo-import-template.json`](templates/test-cases/testmo-import-template.json) | JSON (`.json`) | Machine-readable JSON test case dataset for automated CI/CD runners and test orchestrators. |
| **Test Planning** | [`templates/test-plans/master-test-plan-ieee829.md`](templates/test-plans/master-test-plan-ieee829.md) | Markdown (`.md`) | Full Master Test Plan strictly compliant with IEEE 829-2008 and ISTQB Advanced standards. |
| **Smoke Checklist** | [`templates/checklists/multiplatform-release-smoke-checklist.md`](templates/checklists/multiplatform-release-smoke-checklist.md) | Markdown (`.md`) | Multiplatform console release smoke checklist covering Sony TRC, Microsoft TCR, and Nintendo Lotcheck requirements. |
| **Sign-Off & EoD** | [`templates/reports/daily-eod-qa-signoff-report.md`](templates/reports/daily-eod-qa-signoff-report.md) | Markdown (`.md`) | Daily End-of-Day (EoD) summary and milestone release sign-off template for QA Leads and Engineering Managers. |

### 🛠️ Interactive Web Studio Features
* **Template Explorer:** Browse all templates with tabbed syntax view, formatted preview, clipboard copy, and file download.
* **Interactive Bug Report Builder:** Generate deterministic, production-grade defect reports with dynamic prefixing (`[MODULE][PLATFORM]`), repro rate selectors, step builder, and dual-pane live exports for Jira Wiki Markup, GitHub Markdown, and Slack/Discord.
* **Test Case & CSV Generator:** Interactive tabular editor allowing testers to create, edit, filter, and export valid CSV files with UTF-8 BOM compatibility for TestMo, TestRail, and Jira Xray.
* **Interactive Smoke Checklist:** Real-time audit checklist with Pass / Fail / Blocked / N/A state tracking, progress bars, and formatted export for Slack, email, or Confluence.
* **Bilingual UI:** Instant switching between English and Polish across the entire web interface.

### 🚀 Running the Web Studio Locally
```bash
# Clone the repository
git clone https://github.com/SzymonKochanowski/qa-documentation-templates.git
cd qa-documentation-templates

# Install dependencies
npm install

# Start development server on port 3000
npm run dev

# Build production bundle
npm run build
```

---

<a name="polski"></a>
## 🇵🇱 Opis w Języku Polskim

To repozytorium pełni podwójną rolę w warsztacie nowoczesnego inżyniera QA, testera gier oraz specjalisty SDET:
1. **Fizyczne szablony inżynierskie (`/templates/`):** Gotowe do natychmiastowego wdrożenia szablony w formatach Markdown (`.md`), ustandaryzowany plik CSV do bezpośredniego importu w systemach TestMo / TestRail / Jira Xray oraz ustrukturyzowany zbiór JSON.
2. **Interaktywne Studio Webowe (`src/`):** Nowoczesna aplikacja webowa stworzona w oparciu o React 19, TypeScript i Tailwind CSS w estetyce fioletowo-grafitowej. Zawiera generator raportów błędów z podglądem na żywo (Jira Wiki Markup, GitHub Markdown, Slack), kreator i eksporter zestawów przypadków testowych do CSV, interaktywną checklistę audytową smoke testów oraz przeglądarkę szablonów.

### 📁 Katalog Szablonów w Folderze `/templates/`

| Kategoria | Ścieżka do Pliku | Standard / Format | Opis Zawartości |
| :--- | :--- | :---: | :--- |
| **Game FQA** | [`templates/bug-reports/game-qa-bug-report.md`](templates/bug-reports/game-qa-bug-report.md) | Markdown (`.md`) | Kompletny raport błędu gier dla PC, PS5, Xbox Series X i Switch 2 ze stopniem powtarzalności (X/5), logami silnika i wymogami certyfikacji konsolowej. |
| **Web & REST API** | [`templates/bug-reports/web-api-bug-report.md`](templates/bug-reports/web-api-bug-report.md) | Markdown (`.md`) | Ustandaryzowany raport błędu REST API (RFC 9110) z poleceniem cURL, kodami HTTP, payloadami JSON, nagłówkami i identyfikatorami śledzenia. |
| **Przypadki Testowe** | [`templates/test-cases/testmo-import-template.csv`](templates/test-cases/testmo-import-template.csv) | CSV (`.csv`) | 15 profesjonalnych przypadków testowych gotowych do zaimportowania do TestMo / TestRail / Jira Xray (certyfikacja, API, wydajność). |
| **Przypadki Testowe (JSON)** | [`templates/test-cases/testmo-import-template.json`](templates/test-cases/testmo-import-template.json) | JSON (`.json`) | Maszynowy zbiór danych JSON do automatyzacji testów w potokach CI/CD. |
| **Plan Testów** | [`templates/test-plans/master-test-plan-ieee829.md`](templates/test-plans/master-test-plan-ieee829.md) | Markdown (`.md`) | Główny Plan Testów w 100% zgodny ze standardem IEEE 829-2008 oraz wytycznymi ISTQB Advanced. |
| **Checklista Smoke** | [`templates/checklists/multiplatform-release-smoke-checklist.md`](templates/checklists/multiplatform-release-smoke-checklist.md) | Markdown (`.md`) | Multiplatformowa checklista weryfikacji wydań i podstawowych wymogów certyfikacyjnych (Sony TRC, MS TCR, Nintendo Lotcheck). |
| **Raport Dzienny & Sign-off** | [`templates/reports/daily-eod-qa-signoff-report.md`](templates/reports/daily-eod-qa-signoff-report.md) | Markdown (`.md`) | Raport dzienny podsumowujący (EoD) oraz formalny protokół Milestone Sign-off dla QA Leada i Zarządu. |

### 🛠️ Główne Moduły Studia Webowego
* **Przeglądarka Szablonów (Template Explorer):** Filtrowanie kategorii, podgląd sformatowanego Markdownu lub czystego kodu źródłowego, kopiowanie jednym kliknięciem i pobieranie plików.
* **Interaktywny Kreator Zgłoszeń Błędów (Bug Report Builder):** Formularz z inteligentną walidacją, prefiksami komponentów (`[UI][PS5]`), wyborem profilu (Game QA / Web API) oraz symultanicznym eksportem do formatów Jira Wiki Markup, GitHub Markdown i Slack.
* **Generator Przypadków Testowych & CSV:** W pełni edytowalna tabela z możliwością dodawania, usuwania i edycji kroków testowych oraz eksportem do pliku `.csv` ze znacznikiem UTF-8 BOM.
* **Interaktywna Checklista Weryfikacyjna:** Klikalny audyt z oznaczeniami Pass/Fail/Blocked/N/A, wykresem postępu i generatorem oficjalnego podsumowania audytu.
* **Pełna Dwujęzyczność (PL / EN):** Przełącznik języka w nagłówku aplikacji dostępny w każdym module.

### 🚀 Uruchomienie Aplikacji
```bash
# Klonowanie repozytorium
git clone https://github.com/SzymonKochanowski/qa-documentation-templates.git
cd qa-documentation-templates

# Instalacja zależności
npm install

# Uruchomienie serwera developerskiego na porcie 3000
npm run dev

# Kompilacja produkcyjna
npm run build
```

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.  
Copyright (c) 2026 Szymon Kochanowski.
