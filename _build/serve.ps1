# Simple static server for local preview: powershell -File _build\serve.ps1 [-Port 5173]
param([int]$Port = 5173)
$root = Split-Path $PSScriptRoot -Parent
$types = @{ ".html"="text/html; charset=utf-8"; ".css"="text/css; charset=utf-8"; ".js"="application/javascript; charset=utf-8"; ".svg"="image/svg+xml"; ".png"="image/png"; ".jpg"="image/jpeg"; ".webp"="image/webp"; ".json"="application/json" }
$l = New-Object Net.HttpListener
$l.Prefixes.Add("http://localhost:$Port/")
$l.Start()
Write-Output "Serving $root on http://localhost:$Port/"
while ($l.IsListening) {
  $ctx = $l.GetContext()
  $path = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath.TrimStart('/'))
  if ($path -eq "") { $path = "index.html" }
  $file = Join-Path $root $path
  $res = $ctx.Response
  if (-not (Test-Path $file -PathType Leaf)) { $file = Join-Path $root "404.html"; $res.StatusCode = 404 }
  $ext = [IO.Path]::GetExtension($file).ToLower()
  $res.ContentType = if ($types[$ext]) { $types[$ext] } else { "application/octet-stream" }
  $res.Headers.Add("Cache-Control", "no-store")
  $bytes = [IO.File]::ReadAllBytes($file)
  $res.ContentLength64 = $bytes.Length
  $res.OutputStream.Write($bytes, 0, $bytes.Length)
  $res.Close()
}
