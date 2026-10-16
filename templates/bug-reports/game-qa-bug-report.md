# [FQA] Game Bug Report Template (PC / Console / Mobile)
**Author:** Szymon Kochanowski  
**Standard:** Game Functional QA (FQA) & Compliance Standards (TRC / TCR / Lotcheck)  
**File Reference:** `templates/bug-reports/game-qa-bug-report.md`

---

## 1. Issue Header & Identification
* **Issue Title:** `[<COMPONENT/SYSTEM>][<PLATFORM>] Brief, concise summary of the defect`  
  * *Example:* `[UI][HUD][PS5] Health bar HUD disappears after opening and closing the radial weapon wheel in Combat Zone 03`
* **Issue Key / ID:** `GAME-XXXX`
* **Reporter:** Szymon Kochanowski (QA Engineer / FQA Tester)
* **Date Observed:** YYYY-MM-DD
* **Branch / Stream:** `main` | `staging/release-candidate` | `feature/inventory-v2`
* **Build Number / Commit SHA:** `v1.2.0-rc4 (Build 89412 - git@3f8a29b)`

---

## 2. Environment & Platform Details
| Parameter | Tested Value | Notes / Allowed Variations |
| :--- | :--- | :--- |
| **Platform** | PlayStation 5 / Xbox Series X / Nintendo Switch 2 / PC | Specify exact platform |
| **Environment Type** | PS5 DevKit (Target Manager) / Retail Test Kit | Retail Mode / Development Mode |
| **OS / Firmware Version** | PS5 System Software 24.01-08.60.00 | Ensure latest SDK compliance |
| **Graphics Preset / Mode** | Performance Mode (60 FPS / Dynamic 1440p) | Fidelity (30 FPS 4K) / High Frame Rate (120 Hz) |
| **Display Configuration** | 4K HDR10, HDMI 2.1, VRR Enabled, 16:9 | Also test Ultrawide 21:9 / 32:9 for PC |
| **Input Device** | DualSense Wireless Controller (FW v0348) | Test wireless and wired USB-C mode |
| **System Language / Region** | English (US) / Polish (PL) / Japanese (JA) | Verify character encoding & text bounds |

---

## 3. Defect Classification & Reproduction Rate
* **Severity:** **Major** *(Blocker / Critical / Major / Minor / Trivial / Cosmetic)*
* **Priority:** **P2 - High** *(P1 - Urgent / P2 - High / P3 - Medium / P4 - Low)*
* **Component / Subsystem:** `UI -> HUD Elements -> Radial Wheel`
* **Defect Type:** Functional Defect / State Desynchronization / Visual Artifact / Crash / Memory Leak / Compliance TRC
* **Reproduction Rate:** `5/5 (100% reproducible)`
  * *Repro test runs:*
    * Run 1 (PS5 Performance): Repro (HUD missing)
    * Run 2 (PS5 Fidelity): Repro (HUD missing)
    * Run 3 (XSX Performance): Repro (HUD missing)
    * Run 4 (PC RTX 4080): Repro (HUD missing)
    * Run 5 (PS5 Clean Reboot): Repro (HUD missing)

---

## 4. Preconditions & Test State
1. Player has loaded Save Slot 1 (`Level_03_IndustrialDistrict.sav`).
2. Player character is in active combat stance with at least 2 weapons equipped.
3. Health bar HUD is currently visible at 100% HP.
4. Game is running in 60 FPS Performance Mode.

---

## 5. Steps to Reproduce
1. Launch the title and navigate to **Main Menu -> Campaign -> Continue**.
2. Fast-travel or walk into `Combat Zone 03` to trigger enemy aggro.
3. Confirm the Player Health Bar HUD widget is currently rendered in the top-left corner.
4. Press and hold `L1` (or `LB` on Xbox) to open the Radial Weapon Selection Wheel.
5. Move the Right Analog Stick to select Weapon Slot 2 (Shotgun).
6. Release `L1` rapidly to dismiss the Radial Wheel while taking damage from an active enemy.
7. Observe the top-left portion of the screen where the Player Health Bar is anchored.

---

## 6. Expected vs. Actual Result

### Expected Result
* The Radial Wheel fades out smoothly with the UI dismissal animation.
* The Player Health Bar remains visible or immediately re-anchors to the top-left viewport coordinates.
* Current health points and damage indicators update correctly.

### Actual Result
* The Radial Weapon Wheel closes, but the Player Health Bar widget fails to re-enable its visibility state (`SetVisibility(ESlateVisibility::Visible)` is not fired).
* The top-left HUD remains completely blank during active combat.
* The Health Bar only reappears after pausing to the Main Pause Menu (`Options` button) and resuming.

---

## 7. Crash Information / Engine Logs (If Applicable)
```text
[2026.10.16-10:14:22:812][142]LogHUD: Warning: URadialWheelWidget::OnClosed() invoked while DamageAnimProxy was active.
[2026.10.16-10:14:22:813][142]LogSlate: Warning: SWidget[UPlayerHealthBarWidget] visibility forced to Collapsed by ParentCanvas slot index 4.
[2026.10.16-10:14:22:815][142]LogScript: Error: Script Call Stack:
  Function /Game/UI/HUD/WBP_MainHUD.WBP_MainHUD_C:ExecuteUbergraph_WBP_MainHUD
  Function /Game/UI/HUD/WBP_MainHUD.WBP_MainHUD_C:OnRadialMenuDismissed -> Null pointer exception reading SlateCanvasSlot.
```

---

## 8. Regression & Historical Context
* **Did this issue reproduce in earlier builds?**
  * Tested on `v1.1.8 (Build 88120)`: **Did NOT reproduce (Passed)**.
  * Regression introduced in commit `f9104c8` (*"Refactored Slate UI layer ordering for 120Hz HUD caching"*).
* **Workaround available for players?**
  * Press `Options` to open the System Pause Menu, then press `Circle` to resume. The HUD canvas re-initializes.

---

## 9. Attachments & Evidence
* **Video Capture (60 FPS):** `recordings/PS5_HUD_Desync_20261016.mp4` *(1080p60 showing steps 3 through 7)*
* **Screenshot Comparison:**
  * `screenshots/PS5_Expected_HUD_Active.png`
  * `screenshots/PS5_Actual_HUD_Collapsed.png`
* **Saved Game State:** `saves/ManualSave_03_CombatZone.bin`
* **Target Manager Console Log:** `logs/PS5_DevKit_TM_Session_20261016_1014.log`
