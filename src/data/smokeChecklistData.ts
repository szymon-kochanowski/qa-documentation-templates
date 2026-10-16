/**
 * QA Documentation Templates & Interactive Report Studio
 * Author: Szymon Kochanowski
 * License: MIT
 */

import { SmokeChecklistItem } from '../types';

export const INITIAL_SMOKE_CHECKLIST: SmokeChecklistItem[] = [
  {
    id: 'BOOT-01',
    category: 'boot',
    categoryTitle: { en: 'Boot Sequence & FTUE', pl: 'Sekwencja Startowa i FTUE' },
    checkItem: {
      en: 'Cold boot time <= 15s to interactive title screen',
      pl: 'Czas zimnego startu <= 15s do interaktywnego ekranu tytułowego'
    },
    verificationSteps: {
      en: 'Cold boot from console dashboard / desktop shortcut. Measure seconds to user input prompt.',
      pl: 'Uruchom grę na zimno z dashboardu konsoli / pulpitu PC. Zmierz czas do promptu wejścia.'
    },
    targetPlatform: 'All Platforms',
    status: 'PASS',
    notes: 'Averaged 8.4s on NVMe Gen4 baseline.'
  },
  {
    id: 'BOOT-02',
    category: 'boot',
    categoryTitle: { en: 'Boot Sequence & FTUE', pl: 'Sekwencja Startowa i FTUE' },
    checkItem: {
      en: 'First-party legal screens & copyright trademarks',
      pl: 'Oficjalne ekrany prawne i znaki towarowe platform'
    },
    verificationSteps: {
      en: 'Verify Sony, Xbox, Nintendo, and middleware logos (Dolby, Unreal) render without aspect stretching.',
      pl: 'Sprawdź czy logotypy platform oraz middleware wyświetlają się bez zniekształceń proporcji.'
    },
    targetPlatform: 'All Platforms',
    status: 'PASS',
    notes: 'Verified copyright year 2026.'
  },
  {
    id: 'BOOT-03',
    category: 'boot',
    categoryTitle: { en: 'Boot Sequence & FTUE', pl: 'Sekwencja Startowa i FTUE' },
    checkItem: {
      en: 'Corrupted config file graceful fallback',
      pl: 'Bezpieczny powrót przy uszkodzonym pliku konfiguracyjnym'
    },
    verificationSteps: {
      en: 'Launch title with 0-byte user_settings.ini. Confirm game creates default profile without crash.',
      pl: 'Uruchom grę z pustym plikiem user_settings.ini. Upewnij się, że silnik odtwarza domyślny profil.'
    },
    targetPlatform: 'PC / Consoles',
    status: 'PASS',
    notes: 'Config regenerated cleanly.'
  },
  {
    id: 'CERT-01',
    category: 'cert',
    categoryTitle: { en: 'Console Certification (TRC / TCR / Lotcheck)', pl: 'Certyfikacja Konsolowa (TRC / TCR / Lotcheck)' },
    checkItem: {
      en: 'Gamepad disconnect pause & platform modal prompt',
      pl: 'Pauza po odłączeniu kontrolera i oficjalny prompt ponownego podłączenia'
    },
    verificationSteps: {
      en: 'Disconnect active controller during combat. Verify immediate game pause and platform dialog.',
      pl: 'Odłącz kontroler podczas walki. Sprawdź natychmiastową pauzę i oficjalny komunikat konsoli.'
    },
    targetPlatform: 'PS5 / XSX / Switch 2',
    status: 'PASS',
    notes: 'Audio ducks to ambient level as required by Sony TRC.'
  },
  {
    id: 'CERT-02',
    category: 'cert',
    categoryTitle: { en: 'Console Certification (TRC / TCR / Lotcheck)', pl: 'Certyfikacja Konsolowa (TRC / TCR / Lotcheck)' },
    checkItem: {
      en: 'User profile / account switching mid-session',
      pl: 'Przełączanie profilu gracza w trakcie aktywnej sesji'
    },
    verificationSteps: {
      en: 'Switch OS user account while title is in pause menu. Confirm save slot separation.',
      pl: 'Przełącz profil użytkownika w OS w menu pauzy. Potwierdź separację slotów zapisu.'
    },
    targetPlatform: 'PS5 / Xbox Series X',
    status: 'PASS',
    notes: 'Handled gracefully without process termination.'
  },
  {
    id: 'CERT-03',
    category: 'cert',
    categoryTitle: { en: 'Console Certification (TRC / TCR / Lotcheck)', pl: 'Certyfikacja Konsolowa (TRC / TCR / Lotcheck)' },
    checkItem: {
      en: 'Graceful network disconnect & reconnection',
      pl: 'Obsługa utraty i przywrócenia połączenia sieciowego'
    },
    verificationSteps: {
      en: 'Pull Ethernet during leaderboard query. Ensure clean error dialog without soft-lock.',
      pl: 'Odłącz kabel LAN podczas pobierania tabeli wyników. Brak zawieszenia ani nieskończonego spinnera.'
    },
    targetPlatform: 'All Platforms',
    status: 'PASS',
    notes: 'Retry button functions correctly.'
  },
  {
    id: 'CERT-04',
    category: 'cert',
    categoryTitle: { en: 'Console Certification (TRC / TCR / Lotcheck)', pl: 'Certyfikacja Konsolowa (TRC / TCR / Lotcheck)' },
    checkItem: {
      en: 'Console Rest / Sleep mode suspension & instant wake',
      pl: 'Uśpienie konsoli (Rest Mode) i natychmiastowe wznowienie'
    },
    verificationSteps: {
      en: 'Put console into sleep mode during active gameplay. Wake up and verify audio/video sync.',
      pl: 'Wprowadź konsolę w tryb uśpienia podczas rozgrywki. Wybudź i zweryfikuj synchronizację A/V.'
    },
    targetPlatform: 'PS5 / XSX / Switch 2',
    status: 'PASS',
    notes: 'Wakes within 1.8 seconds.'
  },
  {
    id: 'CERT-05',
    category: 'cert',
    categoryTitle: { en: 'Console Certification (TRC / TCR / Lotcheck)', pl: 'Certyfikacja Konsolowa (TRC / TCR / Lotcheck)' },
    checkItem: {
      en: 'Nintendo Switch 2 Docked to Handheld transition',
      pl: 'Płynne przejście Switch 2 z Docka do trybu przenośnego'
    },
    verificationSteps: {
      en: 'Undock console during gameplay. Verify resolution switch (1440p to 1080p) < 1.0s without stutter.',
      pl: 'Wyjmij konsolę ze stacji dokującej. Zweryfikuj zmianę rozdzielczości poniżej 1.0s bez przycięcia.'
    },
    targetPlatform: 'Nintendo Switch 2',
    status: 'PASS',
    notes: 'Transition completes in 0.72s.'
  },
  {
    id: 'SAVE-01',
    category: 'save',
    categoryTitle: { en: 'Save Data & Storage Integrity', pl: 'Integralność Danych Zapisu i Chmury' },
    checkItem: {
      en: 'Manual save and reload state consistency',
      pl: 'Zapis ręczny i spójność wczytanego stanu rozgrywki'
    },
    verificationSteps: {
      en: 'Create manual save in combat zone, reboot game, load save, and compare player state.',
      pl: 'Utwórz ręczny zapis w strefie walki, zrestartuj grę, wczytaj i porównaj stan postaci.'
    },
    targetPlatform: 'All Platforms',
    status: 'PASS',
    notes: 'Coordinates, gear, and quest stage 100% restored.'
  },
  {
    id: 'SAVE-02',
    category: 'save',
    categoryTitle: { en: 'Save Data & Storage Integrity', pl: 'Integralność Danych Zapisu i Chmury' },
    checkItem: {
      en: 'Autosave checkpoint indicator non-intrusive lifecycle',
      pl: 'Cykl życia ikony autozapisu (widoczna tylko w trakcie zapisu)'
    },
    verificationSteps: {
      en: 'Pass autosave trigger. Check icon visibility during write and immediate dismissal on flush.',
      pl: 'Przejdź przez trigger autozapisu. Sprawdź widoczność ikony tylko podczas zapisu na dysk.'
    },
    targetPlatform: 'All Platforms',
    status: 'PASS',
    notes: 'Animated icon dismisses properly.'
  },
  {
    id: 'SAVE-03',
    category: 'save',
    categoryTitle: { en: 'Save Data & Storage Integrity', pl: 'Integralność Danych Zapisu i Chmury' },
    checkItem: {
      en: 'Power cut / crash resilience during disk write',
      pl: 'Odporność na nagłe wyłączenie zasilania w trakcie zapisu'
    },
    verificationSteps: {
      en: 'Terminate process during save write. Check fallback to intact .bak checkpoint.',
      pl: 'Zabij proces w trakcie zapisu na dysk. Sprawdź przywrócenie nienaruszonego pliku .bak.'
    },
    targetPlatform: 'All Platforms',
    status: 'PASS',
    notes: 'Zero save file corruptions observed.'
  },
  {
    id: 'DISP-01',
    category: 'display',
    categoryTitle: { en: 'Audio / Video & Display Adaptation', pl: 'Dźwięk, Wideo i Adaptacja Ekranu' },
    checkItem: {
      en: 'Ultrawide 21:9 & 32:9 HUD anchor safe zones',
      pl: 'Prawidłowe kotwiczenie HUD na monitorach Ultrawide 21:9 i 32:9'
    },
    verificationSteps: {
      en: 'Run on 3440x1440 and 5120x1440. Verify HUD does not clip and mini-map stays in safe margins.',
      pl: 'Uruchom w 3440x1440 i 5120x1440. Sprawdź czy HUD nie jest ucięty, a minimapa trzyma marginesy.'
    },
    targetPlatform: 'PC (Steam / Windows 11)',
    status: 'PASS',
    notes: 'Pillarboxing on cinematics works as intended.'
  },
  {
    id: 'DISP-02',
    category: 'display',
    categoryTitle: { en: 'Audio / Video & Display Adaptation', pl: 'Dźwięk, Wideo i Adaptacja Ekranu' },
    checkItem: {
      en: 'Dynamic 3D audio occlusion behind physical geometry',
      pl: 'Dynamiczna okluzja dźwięku 3D za przeszkodami geometrycznymi'
    },
    verificationSteps: {
      en: 'Position player behind thick blast door while sound source is playing. Verify low-pass filter.',
      pl: 'Ustaw gracza za grubymi drzwiami schronu. Sprawdź czy filtr dolnoprzepustowy tłumi dźwięk >= 18dB.'
    },
    targetPlatform: 'All Platforms',
    status: 'PASS',
    notes: 'Occlusion calculation correctly triggered.'
  },
  {
    id: 'PERF-01',
    category: 'perf',
    categoryTitle: { en: 'Performance & Stability Baseline', pl: 'Wydajność Bazowa i Stabilność' },
    checkItem: {
      en: '60 FPS Performance Mode target in dense combat',
      pl: 'Utrzymanie celu 60 FPS w Trybie Wydajności podczas intensywnej walki'
    },
    verificationSteps: {
      en: 'Trigger 50 particle effects and 12 enemy actors simultaneously. Capture 1% low frame time.',
      pl: 'Wyzwól 50 efektów cząsteczkowych i 12 wrogów naraz. Zmierz 1% i 0.1% najniższych klatek.'
    },
    targetPlatform: 'PS5 / XSX / PC',
    status: 'PASS',
    notes: 'Average 59.6 FPS, 1% low 56 FPS.'
  },
  {
    id: 'PERF-02',
    category: 'perf',
    categoryTitle: { en: 'Performance & Stability Baseline', pl: 'Wydajność Bazowa i Stabilność' },
    checkItem: {
      en: '45-minute continuous endurance soak without RAM leak',
      pl: '45-minutowy test ciągłego obciążenia (soak) bez wycieków pamięci'
    },
    verificationSteps: {
      en: 'Run automated level cycling and UI opening for 45 minutes. Compare initial vs final RAM usage.',
      pl: 'Uruchom automatyczną pętlę przechodzenia poziomów przez 45 minut. Porównaj RAM początkowy i końcowy.'
    },
    targetPlatform: 'All Platforms',
    status: 'PASS',
    notes: 'RAM increased by only 38MB, well within GC tolerance. 0 crashes.'
  }
];
