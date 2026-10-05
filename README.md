# Runeblade

## Play online with GitHub Pages

In the repository's **Settings → Pages → Build and deployment**, set **Source** to **GitHub Actions**. The `Deploy game to GitHub Pages` workflow builds and publishes the game whenever `main` changes. You can also run it manually from the **Actions** tab.

After a successful deployment, play at https://alexikleo.github.io/RuneBlade/. Browser saves stay in the browser you use. Subsequent pushes to `main` update the same link.

## Develop remotely with GitHub Codespaces

On GitHub, select **Code → Codespaces → Create codespace**. The included dev container installs Node.js 22 and the project dependencies automatically.

Run `pnpm dev --host 0.0.0.0 --port 3000`, then open port 3000 from the Ports panel to play. Run `pnpm build` to create a production build. Run `node scripts/combat-check.cjs`, `node scripts/balance-check.cjs`, and `pnpm exec tsc --noEmit` to validate changes.

Commit and push your changes to save them back to GitHub. Browser game saves are local to that browser and are not included in the repository. Codespaces runs the web game; packaging for the iPhone App Store is a separate step.

Portrait endless fantasy runner. Tap right/Space for sword, hold for magic, hold left/Shift for shield. Escape pauses.

## Start the game

Double-click `Start Game.cmd` in this folder. It starts the server in the background, waits for the game to respond, then opens http://localhost:3000/ in your default browser. If the game is already running, it reuses it. Run the launcher again after restarting your computer. You can also refresh the same URL inside Codex. Saves belong to the browser you use, so use the same browser to keep your progress.

Keep the launcher in this folder; create a Windows shortcut to it if you want it elsewhere. Startup diagnostics are in `.local-game/server.log` and `server-error.log`.

## Current game

Endless waves, archers and bosses; speed responds to crowds. Persistent coins, skill upgrades, three swords and advanced abilities. Smooth cartoon scenery and characters, ranked magic effects, weapon-colored sword trails and shield impact ripples.

Validation: `node scripts/combat-check.cjs` and `node node_modules/typescript/bin/tsc --noEmit`.
Build: `pnpm build`. Local development: `pnpm dev`.

iPhone touch testing and publishing remain deferred.

Temporary pickups: Sword Frenzy (8s), Arcane Storm (10s), Iron Guard (12s), Coin Magnet (15s), Second Wind (+1 heart), Frost Aura (6s), Flame Blade (10s), Lightning Chain (8s), Guardian Spirit (20s or one fatal hit). Normal enemies have a 16% drop chance; bosses guarantee one. Rare powers comprise 22% of drops. Different powers stack, duplicates refresh, pause freezes timers and restart clears them. Flame hits burn for 3 seconds; lightning jumps to two nearby foes. Powers are collected automatically as the hero reaches them.
