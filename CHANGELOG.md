# Change Log
All notable changes to this project will be documented in this file.
 
The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).
 
## [1.1.0] - 2024-08-14

### Changed

- Number of displayed rounds is adjusted if necessary according to the number of matches in the 1st round.
- Sides without contestantId are made unclickable (to prevent highlighing of the "BYE" sides).

## [1.1.1] - 2024-08-???????

### Fixed

- Prevent double scrollbar in Safari
- Fix "gradual height growth" in Safari
- Fix nasty lagginess on scroll in Chromium when >1 instance of bracketry on a page
- Prevent scrollbar from overflowing from its parent (happened in iOS Safari)