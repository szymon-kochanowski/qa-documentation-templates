# Multiplatform Release Smoke & Console Certification Checklist
**Author:** Szymon Kochanowski  
**Standard:** Platform Compliance Guidelines (Sony TRC, Microsoft TCR, Nintendo Lotcheck)  
**File Reference:** `templates/checklists/multiplatform-release-smoke-checklist.md`  

---

## Audit Metadata
* **Target Build Number:** `v1.2.0-rc5 (Build 90412)`
* **Audit Date:** YYYY-MM-DD
* **Lead Auditor:** Szymon Kochanowski (QA Lead)
* **Tested Target Platforms:** `[x] PlayStation 5` | `[x] Xbox Series X` | `[x] Nintendo Switch 2` | `[x] PC (Steam)`
* **Overall Assessment:** `[ ] PASS` | `[ ] CONDITIONAL PASS` | `[ ] FAIL`

---

## 1. Boot Sequence & First-Time User Experience (FTUE)
| ID | Check Item | Verification Steps | Target Platform | Status | Notes / Bug ID |
| :--- | :--- | :--- | :--- | :---: | :--- |
| **BOOT-01** | Cold boot time | Cold boot from dashboard to interactive Start screen in <= 15s. | All | `PASS` | Average: 8.4s on NVMe Gen4 |
| **BOOT-02** | Legal splash screens | Sony/Microsoft/Nintendo logos & Dolby/Unreal trademarks display without distortion. | All | `PASS` | Correct copyright year (2026) |
| **BOOT-03** | Corrupt config recovery | Launch with deleted or zero-byte `user_settings.ini`. | PC / Consoles | `PASS` | Defaults recreated gracefully |
| **BOOT-04** | Title screen start prompt | Pressing Start / Cross / A advances from title screen; unassigned buttons ignored. | All | `PASS` | Clean animation transition |

---

## 2. Console Certification & Technical Requirements (TRC / TCR / Lotcheck)
| ID | Check Item | Verification Steps | Target Platform | Status | Notes / Bug ID |
| :--- | :--- | :--- | :--- | :---: | :--- |
| **CERT-01** | Gamepad disconnect handling | Turn off or pull USB cable of active controller during combat. | PS5 / XSX / Switch 2 | `PASS` | Game pauses; official reconnect prompt shown |
| **CERT-02** | User profile switching | Switch system user account while game is running in pause menu. | PS5 / Xbox Series X | `PASS` | Prompts user; saves to new profile partition |
| **CERT-03** | Network disconnect recovery | Pull Ethernet / disable Wi-Fi during online leaderboard fetch. | All | `PASS` | Displays clean error dialog; no infinite spinner |
| **CERT-04** | System sleep / resume | Put console into Rest / Sleep mode during active gameplay and wake. | PS5 / XSX / Switch 2 | `PASS` | Instant resume within 2s; no audio desync |
| **CERT-05** | Switch 2 Dock / Undock | Switch 2 transition between TV Dock (1440p) and Handheld (1080p). | Nintendo Switch 2 | `PASS` | Seamless swap < 0.8s, zero visual glitching |
| **CERT-06** | System language reflection | Change console system language from English to Polish / Japanese. | All | `PASS` | Game reflects new language on boot |

---

## 3. Save / Load & Cloud Storage Integrity
| ID | Check Item | Verification Steps | Target Platform | Status | Notes / Bug ID |
| :--- | :--- | :--- | :--- | :---: | :--- |
| **SAVE-01** | Manual save / load cycle | Create manual save slot, restart game, and load save state. | All | `PASS` | Player coordinates, HP, inventory 100% matched |
| **SAVE-02** | Autosave checkpoint | Pass trigger volume and verify animated autosave icon in corner. | All | `PASS` | Icon dismisses after disk write completes |
| **SAVE-03** | Storage quota limits | Fill storage up to 99% quota and attempt to save new slot. | Consoles | `PASS` | Displays platform-compliant out-of-space dialog |
| **SAVE-04** | Power cut resilience | Kill power or process during active save disk write. | Consoles / PC | `PASS` | Backup save `.bak` restored cleanly; no corrupt flag |

---

## 4. Audio, Video & Display Adaptation
| ID | Check Item | Verification Steps | Target Platform | Status | Notes / Bug ID |
| :--- | :--- | :--- | :--- | :---: | :--- |
| **DISP-01** | Ultrawide 21:9 & 32:9 HUD | Render game on 3440x1440 and 5120x1440 PC screens. | PC | `PASS` | HUD anchored to safe margins; 3D camera FOV correct |
| **DISP-02** | HDR10 calibration | Toggle HDR on supported display; verify black levels & peak nits. | PS5 / XSX / PC | `PASS` | No color banding in dark scenes |
| **DISP-03** | 60/120Hz VRR stability | Check frame pacing stability with Variable Refresh Rate active. | PS5 / XSX / PC | `PASS` | Smooth pacing; zero micro-tearing |
| **AUD-01** | Dynamic 3D audio occlusion | Test acoustic dampening behind solid concrete vs glass obstacles. | All | `PASS` | Audio low-pass occlusion filter applied properly |
| **AUD-02** | System audio background | Suspend game and navigate console OS dashboard. | PS5 / XSX | `PASS` | Game audio mutes immediately on dashboard |

---

## 5. Performance Baseline & Stability
| ID | Check Item | Verification Steps | Target Platform | Status | Notes / Bug ID |
| :--- | :--- | :--- | :--- | :---: | :--- |
| **PERF-01** | 60 FPS Performance Mode | Heavy scene (50 NPCs + volumetric weather in Central Plaza). | PS5 / XSX | `PASS` | 99% percentile >= 59.4 FPS; 0.1% low >= 54 FPS |
| **PERF-02** | 45-minute continuous soak | Run continuous automated combat / fast travel loop for 45 minutes. | All | `PASS` | RAM stable (+42 MB delta); 0 crash events |
| **PERF-03** | Thermal & fan profile | Inspect console fan acoustic levels under continuous 100% GPU load. | PS5 / Switch 2 | `PASS` | Within safe operating thermal envelope |

---

## 6. Audit Summary & Sign-Off Recommendation
* **Total Checks:** 20
* **Passed:** 20 / 20 (100%)
* **Failed:** 0
* **Blocked:** 0
* **Recommendation:** **READY FOR RELEASE / SUBMISSION**
* **Signed by:** Szymon Kochanowski, Lead QA Engineer (2026-10-16)
