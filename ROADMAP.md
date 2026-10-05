# Build roadmap

Requested order (current work):
- [x] 1. Enemy attacks: runner charge, brute slam, archer aim cues.
- [x] 2. Boss rotation: knight, golem, magical creature with different patterns.
- [x] 3. Defeat animations: tumble/dissolve, then bouncing rewards.
- [x] 4. Road variety: bridges, ruins and forest clearings.

Each stage gets gameplay checks. Browser/iPhone feel remains for user playtesting. iPhone packaging and publishing remain deferred.

Implemented all four steps in order. Final validation and user playtesting follow. Boss order: Iron Warden at wave 5, Stone Golem at 10, Storm Wisp at 15, then repeat. Road landmarks scroll with distance and do not change collision or controls.

Enemy art update: regional factions now follow each five-wave region. Old Road: Ironbound raiders with spiked plates and slit helmets. Mosswood: Thornborn creatures with bark bodies, roots and antlers. Ember Ruins: Ashbound monsters with obsidian armor, horns and glowing fissures. Each faction has grunt, runner, brute and archer silhouettes; bosses match their region. Spawned enemies keep their region during defeat animations. Visual playtesting pending.

Progression expansion implemented: 21 swords (starting Iron plus 20), 20 magic powers, 20 shields; ten ranks per item, sequential unlocks and free re-equipping. Full catalogue previews share artwork with combat. Legacy saves migrate existing swords/mastery/coins. Magic has arcane volley, burn, chill, chain and piercing families. Shield throw (E or button) targets on-screen enemies once each, then returns; cooldown, damage and efficiency grow with shield upgrades. Build and regression tests pass. Economy and late-game feel need player testing.

Skill tree expansion: 18 new connected skills across Blade, Arcanist and Guardian paths; ten ranks each (180 upgrades), next node requires previous rank 3, first requires base mastery 3. Existing mastery and advanced skills preserved. New ranks apply to every equipped item. Prerequisites, transactions, migration and combat bonuses tested. Economy remains subject to playtesting.

Base mastery expanded from 3 to 30 ranks each: Sword Mastery, Arcane Power and Shield Endurance (81 additional ranks). First three prices/effects preserved; later costs grow gradually. Sword +0.5 and magic +0.2 damage per rank; shield drain reduces 3% per rank after rank 3. Existing advanced skills still unlock at rank 3 and survive high-rank saves. Regression checks passed.

Environment visual pass: bevelled paving, layered fortress walls and banners, warm torch light, forest canopies and luminous mushrooms, fireflies, volcanic channels and embers. Enemy materials shaded with highlights; golem redesigned with broad stone body, root crown and glowing runes; wisp gains orbiting energy. Fortress/bridge checked in browser; combat checks pass.

Ten-region journey: 1 Old Road, 2 Mosswood, 3 Ember Ruins, 4 Frostfall Pass, 5 Crystal Depths, 6 Sunken Kingdom, 7 Golden Wastes, 8 Blighted Marsh, 9 Sky Citadel, 10 Void Throne. Five waves per region, boss every fifth wave, 50-wave first journey. After wave 50 the endless run continues with existing increasing enemy strength. Seven new scenery designs and faction palettes; header shows region/cycle. Three existing boss attack archetypes continue rotating.

Lore and relic quest: Caelan died saving refugees 100 years ago; his oath resurrected him to defeat Veyr, the Hollow King, at wave 50. Chronicle reveals five memories from relics at waves 5/15/25/35/45. Relics persist across runs. All five automatically forge and equip Infinity Saber for the final approach; it cannot be purchased. Strongest sword with ten upgrade ranks; catalogue now has 22 swords. Ending recorded in Chronicle, endless play remains. Save and relic gating tests pass.

### Piercing lunge — complete
- Q / Lunge button chains sword stabs through incoming on-screen enemies and returns home.
- 1.5x equipped sword damage, 10-second cooldown, golden trail and dash protection.
- Combat regression checks, TypeScript and production build pass.


### Upgrade visual scaling — complete
- Sword trails and impacts, all magic bolt trails/cores/sparks, and shield glow scale with mastery, gear rank and tier.
- Bounded visual strength preserves readability; combat balance unchanged.
- TypeScript, combat regression checks and production build pass.


### Shield designs and archer poses — complete
- 21 shields with 10 upgrades each; final Captain America Shield has concentric red/white rings, blue centre and white star.
- Varied shield silhouettes and rank aura shared across previews, equipped gear and throws.
- Archers aim forward with gripping hands, drawn bowstring and arrow aligned toward hero.
- TypeScript, combat/save checks and production build passed.


### Legendary equipment — complete
- Six permanent items cost 8,000–25,000 coins; maximum three equipped before a run.
- Titan damage, Stormcaller triple chain bolts, Hourglass cooldowns, Winter slowing aura, Phoenix revival, Aegis throw damage and wave healing.
- Items tab previews powers, ownership, costs and three slots; equipped symbols follow hero.
- Save validation, purchases, slot cap, persistence and core combat effects tested; TypeScript and build pass.


### Legendary collection expanded — complete
- 12 items total; six additions priced 28,000–40,000 coins, retaining three slots.
- Magic damage, rapid sword/knockback, five-target piercing, dragon burning, doubled pickup duration and sentinel regeneration/stuns.
- TypeScript, combat regression checks and build passed.


### Twenty legendary items — complete
- Eight additions priced 42,000–60,000 coins. Three-slot limit retained.
- Double loot coins, rapid casting, execution swings, permanent magnet, triple lunge damage, chilling bolts, stamina efficiency and increased drops.
- Save/loadout and combat regression checks, TypeScript and build pass.

