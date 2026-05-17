# BlazorMandelbrotDeepzoom

Blazor WebAssembly hosted app (.NET 10) voor interactieve Mandelbrot deep zoom.

## Projectstructuur

```
BlazorMandelbrotDeepzoom/
├── BlazorMandelbrotDeepzoom/
│   ├── Client/          # Blazor WASM frontend
│   ├── Server/          # ASP.NET Core host + API
│   └── Shared/          # Gedeelde DTOs
├── Mandelbrot/          # Berekeningslogica (BigDecimal, rendering)
├── BigDecimalContracts/ # Interfaces (IBigDecimal, IBigDecimalFactory)
├── BigDecimalDParker/   # BigDecimal implementatie
└── BigDecimalJavaMath/  # Alternatieve implementatie
```

## Client

Pad: `BlazorMandelbrotDeepzoom/BlazorMandelbrotDeepzoom/Client/`

- `Pages/Canvas.razor` + `Pages/Canvas.razor.cs` — hoofdpagina: render Mandelbrot, sla interessante punten op
- `Pages/POIs.razor` — gallery van opgeslagen punten; klik navigeert naar Canvas met coördinaten als query params (`?pos=&posi=&size=&iterationlimit=`)
- `src/*.ts` → webpack → `wwwroot/dist/bundle.js` (canvasinterop, muisinteractie, fetch+draw)
- Run/watch TypeScript: `npm run build` / `npm run watch` in `Client/`

## Server

- `Controllers/MandelbrotController.cs` — `GET /Mandelbrot` — serverside rendering, retourneert `MandelbrotImageDTO`
- `Controllers/InterestingPointsController.cs` — `GET/POST /InterestingPoints`, `GET /InterestingPoints/{id}/image`

## Azure Storage (`stmandelbrot`)

- **Table** `interestingpoints` — partitionKey=`mandelbrot`, fields: Name, Real, Imaginary, Size, IterationLimit, ImageUrl
- **Blob container** `mandelbrot-snapshots` — PNG snapshots als `{guid}.png` (privé, geserveerd via image-proxy endpoint)
- Auth: `DefaultAzureCredential` (lokaal via `az login`); vereiste rollen: `Storage Table Data Contributor`, `Storage Blob Data Contributor`

## JS↔Blazor interop

`window.canvasInterop` is een `MandelbrotCanvas` instantie. Blazor roept aan:
- `canvasInterop.init(id, dotnetobjref, w, h)`
- `canvasInterop.fetchAndDraw(pos, posi, size, iterationlimit)`
- `canvasInterop.getCanvasDataUrl()` → base64 PNG data URL

JS roept Blazor aan via `dotnetobjref.invokeMethod('NewIterationLimit', n)` en `'Dragged'`.

## Movie Maker & interpolatie

- `Server/Hubs/MovieHub.cs` — SignalR hub; client stuurt `StartGeneration(MovieGenerationRequestDTO)`, server stuurt per frame `FrameReady(FrameReadyDTO)` en tot slot `GenerationComplete`
- `Server/MovieFrameInterpolator.cs` — lineaire interpolatie van Real/Imaginary coördinaten via BigDecimal-rekenkunde (geen floating-point afronding)
- **Size** gebruikt logaritmische interpolatie: `exp(logStart + t * (logEnd - logStart))` zodat de zoom gelijkmatig verloopt
- Gegenereerde frames worden tijdelijk opgeslagen als `movie-frames/{connectionId}/{frameNumber}` in Blob Storage en via `GET /api/movieframes/{connectionId}/{i}` geserveerd
- `Controllers/MovieFramesController.cs` — `DELETE /api/movieframes/{connectionId}` ruimt frames op na video-export

## Coördinaatrepresentatie

- Real, Imaginary en Size worden **altijd als string** doorgegeven (hoge-precisie BigDecimal); gebruik nooit `double` voor opslaan of vergelijken
- `BigDecimalFactory` (uit `BigDecimalDParker`) is de standaard factory op zowel client als server
- `MathContextFactory` is nodig naast `BigDecimalFactory` voor Mandelbrot-berekeningen

## Bouwen

- `dotnet build` werkt via bash/WSL; gebruik **geen** `pwsh`/PowerShell voor dotnet-commando's in dit project
- TypeScript bundelen: `npm run build` in `Client/` (webpack, output naar `wwwroot/dist/bundle.js`)
- `Microsoft.AspNetCore.WebUtilities` is **niet** beschikbaar in de WASM-client zonder extra pakket; gebruik `Uri.EscapeDataString` voor query string-encoding

## Gedeelde DTOs (Shared/)

| DTO | Gebruik |
|-----|---------|
| `InterestingPointDTO` | POST body bij opslaan POI (inclusief base64 PNG) |
| `InterestingPointSummaryDTO` | GET-response lijst van POIs |
| `MovieGenerationRequestDTO` | SignalR request payload |
| `FrameReadyDTO` | SignalR response per frame |
| `InterpolationFrameDTO` | Response van `GET /Interpolation` |
