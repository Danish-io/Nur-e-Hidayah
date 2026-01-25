$baseUrl = "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions"
$destDir = "apps/web/lib/data"
$books = @("muslim", "abudawud", "tirmidhi", "nasai", "ibnmajah")

Ensure-Directory -Path $destDir

foreach ($book in $books) {
    # English
    $urlEn = "$baseUrl/eng-$book.json"
    $outEn = "$destDir/$book.json"
    Write-Host "Downloading $book (English)..."
    curl.exe -L -o $outEn $urlEn

    # Urdu
    $urlUr = "$baseUrl/urd-$book.json"
    $outUr = "$destDir/$book-ur.json"
    Write-Host "Downloading $book (Urdu)..."
    curl.exe -L -o $outUr $urlUr

    # Arabic
    $urlAr = "$baseUrl/ara-$book.json"
    $outAr = "$destDir/$book-ar.json"
    Write-Host "Downloading $book (Arabic)..."
    curl.exe -L -o $outAr $urlAr
}

Write-Host "All downloads complete."
