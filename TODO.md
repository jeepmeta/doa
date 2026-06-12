# TODO

## Task: rewrite app.tsx for side-by-side charts + implement rolling stacked candles

### Step 1
- [x] Update `src/App.tsx` layout so `FatePie` and `Candles3D` are always side-by-side on mobile.
- [x] Ensure pie is exactly 33% width and stays inside an `aspect-square` div.
- [x] Make candles fill remaining width and match the shared height.


### Step 2
- [x] Refactor `src/components/Candles3D.tsx` to be height-responsive (`h-full w-full`) instead of fixed `h-[600px]`.
- [x] Convert visualization from current mock 3D bars to 24 rolling stacked candles (3 segments per candle).



### Step 3
- [x] Keep isolated mock fetch interface in-place (until API endpoints are wired) and update segment heights over time via a rolling candle generator.
- [ ] Wire Candles3D to API data source (or replace mock with real endpoints).

### Step 4
- [ ] Smoke-test in browser and adjust scene scaling to avoid clipping/overflow.


