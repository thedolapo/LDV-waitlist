# Background music – handling and performance

## Current setup

- **No autoplay** – playback starts only after the user taps Play (avoids browser blocks and respects preferences).
- **`preload="none"`** – the MP3 is not downloaded until the user taps Play, which improves initial page load and saves bandwidth for visitors who don’t play music.
- **Volume** – 0–100% slider; default 50%.
- **Loop** – track loops for ambient background use.

## Recommendations

1. **File size** – Keep the track under ~2–3 MB if possible (e.g. 2–3 min at 128 kbps). Consider offering a lower-bitrate or shorter “ambient” version for slow connections.
2. **Format** – MP3 is widely supported. For smaller size at similar quality, you can add an `<source type="audio/mpeg">` and optionally `<source type="audio/ogg">` and let the browser choose.
3. **Hosting** – Serve the file from your CDN or static host with cache headers so repeat visits don’t re-download.
4. **Persist volume** – To remember volume across visits, store it in `localStorage` and restore it on mount (and when the user changes volume).
5. **Respect “reduced motion” / accessibility** – Keep the default state as paused so users who prefer no sound aren’t surprised. Avoid auto-playing even if the browser allows it.
6. **Mobile** – On iOS, playback may be limited until the user has interacted with the page; the current “tap to play” pattern is appropriate.

## Optional improvements

- **Persist play state** – e.g. store “was playing” in `sessionStorage` and restore after navigation within the app.
- **Fade in on first play** – increase volume from 0 to current over ~1 s for a smoother start.
- **Loading state** – show a short “Loading…” or spinner on the play button when `audio.readyState` is still loading on first play.
