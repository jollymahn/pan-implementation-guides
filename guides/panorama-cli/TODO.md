# Panorama CLI Reference — Priority TODO

> **Status:** Blocked — waiting on configuration mode command harvest to complete + debug

## 1. Complete CLI Harvest
- [ ] Debug and fix configuration mode command scraping (currently only operational mode commands harvested)
- [ ] Re-run harvest to pull all `set`, `delete`, `edit`, `show` config-mode commands
- [ ] Merge config-mode commands into the existing 522 operational-mode command cards

## 2. Restructure CLI Reference Presentation
- [ ] Separate operational mode and configuration mode into distinct sections/tabs
- [ ] Update navigation/search to distinguish between modes (e.g., `> set deviceconfig` vs `> show system info`)
- [ ] Consider tree-view grouping by command hierarchy within each mode

## 3. Cross-Reference with Panorama Web Help
- [ ] Map web help UI paths (Device > Setup > Management) to CLI `set` command paths
- [ ] Extract field descriptions and valid values from `Panorama-Web-Help/docs/`
- [ ] Generate contextual CLI examples using web help as source material
- [ ] Inject examples into command cards (both operational and config mode)

## 4. Integrate Web Help into Validation Workflow
- [ ] Wire `Panorama-Web-Help/docs/` into guide validation (grep field names, verify settings)
- [ ] Add to `pan-docs-reference/` manifest for unified search across all PAN docs
- [ ] Build cross-reference index: UI path <-> CLI command <-> web help page

## Blocked On
- Configuration mode command harvest completion and debugging (Sean)
