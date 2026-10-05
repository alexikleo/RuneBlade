# Desktop balance pass

Run `node scripts/combat-check.cjs` for combat, purchases, reload/migration, projectile, recovery, pause and restart regressions.
Run `node scripts/balance-check.cjs` for five seeded runs per strategy/loadout (600 simulated seconds maximum). These are automated strategies with precise timing, not human playtests.

Baseline: starting equipment + continuous magic reached wave 6; mixed attacks and blocks reached wave 13. Maxed mixed play reached wave 32 at the simulation cutoff.
After 0.4-second damage recovery: continuous magic reached wave 7; starting mixed play reached wave 14. Maxed mixed play still reached wave 32 at cutoff. No attack damage nerfs applied.

Progression: first rank remains 20 coins; later ranks cost 90 and 180. Knight blade costs 140; runic sword costs 360. Full progression costs 1,370 coins instead of 790. Owned items are preserved; no retroactive charges.

Recovery prevents simultaneous projectile volleys causing multiple health hits. Blocks still consume stamina per projectile. Later attacks can still hurt after recovery ends.

Desktop UI inspected: upgrade/armoury screen, disabled unaffordable purchases, return to run, restart and pause. Audio audibility and iPhone controls were not validated in this pass. Further human playtesting is needed to judge difficulty and feel.
