# Ruta base donde están las carpetas de productos
$basePath = "C:\wamp64\www\LANDING_MANUAL\public\Videos"

# Extensiones de video válidas
$extensiones = @("*.mp4", "*.mov", "*.avi", "*.mkv")

# Recorre todas las extensiones posibles
foreach ($extension in $extensiones) {
    Get-ChildItem -Path $basePath -Recurse -Filter $extension | ForEach-Object {
        $videoOriginal = $_.FullName
        $directorio = $_.DirectoryName
        $nombreArchivo = $_.Name
        $nombreTemporal = "$($videoOriginal).tmp.mp4"

        Write-Host "🔄 Reprocesando: $nombreArchivo"

        # Ejecutar ffmpeg
        & "C:\ffmpeg\bin\ffmpeg.exe" -i "$videoOriginal" -vcodec libx264 -acodec aac -movflags +faststart "$nombreTemporal"

        # Reemplazar el archivo original solo si la conversión fue exitosa
        if (Test-Path "$nombreTemporal") {
            Remove-Item "$videoOriginal"
            Rename-Item "$nombreTemporal" "$nombreArchivo"
            Write-Host "✅ Reemplazado: $nombreArchivo"
        } else {
            Write-Host "❌ Error procesando: $nombreArchivo"
        }
    }
}
