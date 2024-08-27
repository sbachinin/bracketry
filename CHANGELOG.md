# Change Log

## [1.1.0] - 2024-08-14

### Changed

- Number of displayed rounds is adjusted if necessary according to the number of matches in the 1st round.
- Sides without contestantId are made unclickable (to prevent highlighing of the "BYE" sides).

## [1.1.1] - 2024-08-27

### Fixed

- Fix "gradual height growth" in Safari
- Fix nasty lagginess on scroll in Chromium when >1 instance of bracketry on a page
- Prevent double scrollbar in Safari
- Prevent scrollbar from overflowing from its parent (happened in iOS Safari)
- Force default cursor while scrolling the bracket