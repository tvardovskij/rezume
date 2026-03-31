param(
  [string]$InputGif = (Join-Path $PSScriptRoot "../public/media/hero/source/hero-original.gif"),
  [string]$OutputDir = (Join-Path $PSScriptRoot "../public/media/hero"),
  [int]$Width = 1920,
  [int]$Fps = 24
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path $InputGif)) {
  Write-Error "Input GIF not found: $InputGif"
}

if (-not (Test-Path $OutputDir)) {
  New-Item -Path $OutputDir -ItemType Directory | Out-Null
}

$ffmpegExists = Get-Command ffmpeg -ErrorAction SilentlyContinue
if (-not $ffmpegExists) {
  Write-Error "ffmpeg is required. Install ffmpeg and re-run script."
}

$optimizedGif = Join-Path $OutputDir "hero-bg.optimized.gif"
$webmOutput = Join-Path $OutputDir "hero-bg.webm"
$mp4Output = Join-Path $OutputDir "hero-bg.mp4"

Write-Host "Creating optimized GIF..."
ffmpeg -y -i $InputGif -vf "fps=$Fps,scale=${Width}:-2:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=96[p];[s1][p]paletteuse=dither=bayer:bayer_scale=3" $optimizedGif

Write-Host "Creating WebM..."
ffmpeg -y -i $InputGif -vf "fps=$Fps,scale=${Width}:-2:flags=lanczos" -an -c:v libvpx-vp9 -b:v 0 -crf 35 $webmOutput

Write-Host "Creating MP4..."
ffmpeg -y -i $InputGif -vf "fps=$Fps,scale=${Width}:-2:flags=lanczos" -an -c:v libx264 -pix_fmt yuv420p -movflags +faststart -crf 23 $mp4Output

Write-Host "Done:"
Write-Host " - $optimizedGif"
Write-Host " - $webmOutput"
Write-Host " - $mp4Output"
