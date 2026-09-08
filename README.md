# Runeblade — Stage 01

Portrait browser prototype: hero at the bottom, enemies from above.

Play: tap the right control for sword; hold right for magic; hold left for shield.
Desktop: Space for attack, Shift for shield, Escape to pause.
Survive 60 seconds and clear remaining enemies. Five hits end a run.

Current scope: one enemy, sword range, bolts, block timing, stamina, pause and restart.
Next stages (after play feedback): coins and a first level, then skill tree and weapons.
Art is temporary emoji artwork, and difficulty is intentionally introductory.

Development: pnpm dev
Production: pnpm build
Validation: node scripts/combat-check.cjs

WebMCP: optional read_trial_status exposes run state where supported. No supported browser WebMCP validation context was available; its live registration remains unverified.
