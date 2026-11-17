<?php
// Fil: /log/list.php
// Lister tilgjengelige månedlige loggfiler (log/<år>/<måned>.txt) som JSON, f.eks.
// ["2026-09"], slik at stats.html vet hvilke filer den kan hente uten å måtte
// gjette filnavn eller vedlikeholde en manuell liste.
header('Content-Type: application/json');

$months = [];
foreach (glob(__DIR__ . '/[0-9][0-9][0-9][0-9]', GLOB_ONLYDIR) as $yearDir) {
    $year = basename($yearDir);
    foreach (glob($yearDir . '/[0-9][0-9].txt') as $monthFile) {
        $months[] = $year . '-' . basename($monthFile, '.txt');
    }
}
sort($months);

echo json_encode($months);
?>
