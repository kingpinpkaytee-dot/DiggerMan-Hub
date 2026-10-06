# DiggerMan Media Library

Permanent public media structure for DiggerMan Hub and social publishing.

## Source of truth

Media is organized by campaign and content type. Public assets may be referenced by GitHub raw URLs.

`https://raw.githubusercontent.com/kingpinpkaytee-dot/DiggerMan-Hub/main/media/`

## Structure

- `album/` — album campaign artwork and promotional media
- `singles/` — single-release media
- `stories/` — story/reel assets
- `templates/` — reusable caption templates

### Celestial Frequency

Reserved path:

`media/album/celestial-frequency/`

Expected campaign assets:

- `cover-cosmic.jpg`
- `promo-soundwave.jpg`
- `promo-rooftop.jpg`
- `portrait-closeup.jpg`

## Asset rule

Add new approved media without deleting or replacing established site imagery. Preserve approved artwork and existing Cloudinary references unless explicitly instructed otherwise.

## URL convention

Example:

`https://raw.githubusercontent.com/kingpinpkaytee-dot/DiggerMan-Hub/main/media/album/celestial-frequency/cover-cosmic.jpg`

GitHub raw URLs are the automation-facing media URLs; they should be stored as data/config rather than hard-coded across multiple UI components.
