<?php
// Fil: /log_event.php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
$logDir = __DIR__ . '/log';

// Bruk hendelsens egen timestamp (satt av klienten da hendelsen skjedde) hvis den finnes,
// slik at hendelser som har ligget i kø i localStorage (offline) havner i riktig måneds
// loggfil, og ikke alle stemples med tidspunktet de til slutt blir sendt på.
function resolveLogTimestamp($iso) {
    if (!empty($iso)) {
        try {
            $dt = new DateTime($iso);
            $dt->setTimezone(new DateTimeZone(date_default_timezone_get()));
            return $dt;
        } catch (Exception $e) {
            // Ugyldig timestamp fra klienten, fall tilbake til servertid
        }
    }
    return new DateTime();
}

// Eldre klienter (før getOS() ble innført i js) sendte hele navigator.userAgent i stedet
// for en kort OS-etikett. Gjenkjenn dette og utled samme etikett som getOS() ville gitt,
// slik at gamle og nye logglinjer blir konsistente.
function resolveOsLabel($userAgent) {
    $knownOsLabels = ['iOS', 'ChromeOS', 'Android', 'macOS', 'Windows', 'Linux', 'Unknown'];
    if (empty($userAgent)) {
        return 'Unknown';
    }
    if (in_array($userAgent, $knownOsLabels, true)) {
        return $userAgent;
    }
    if (preg_match('/iPhone|iPad|iPod/', $userAgent)) return 'iOS';
    if (preg_match('/CrOS/', $userAgent)) return 'ChromeOS';
    if (preg_match('/Android/', $userAgent)) return 'Android';
    if (preg_match('/Mac OS X/', $userAgent)) return 'macOS';
    if (preg_match('/Windows/', $userAgent)) return 'Windows';
    if (preg_match('/Linux/', $userAgent)) return 'Linux';
    return 'Unknown';
}

// Skriver til log/<år>/<måned>.txt, f.eks. log/2026/09.txt, og oppretter mappene ved behov.
// Én fil per måned holder hver enkelt loggfil liten uten at gamle rader må ryddes manuelt.
function appendLogEntry($logDir, $entry) {
    $dt = resolveLogTimestamp($entry['timestamp'] ?? null);
    $dir = $logDir . '/' . $dt->format('Y');
    if (!is_dir($dir) && !mkdir($dir, 0755, true) && !is_dir($dir)) {
        // To samtidige forespørsler kan begge prøve å opprette mappa; ignorer feilen
        // hvis den likevel finnes etter forsøket (unngår en race på is_dir/mkdir).
        return;
    }
    $logFile = $dir . '/' . $dt->format('m') . '.txt';
    $logLine = $dt->format('Y-m-d H:i:s') . ' | ' . $entry['event'] . ' | ' . resolveOsLabel($entry['userAgent'] ?? null) . ' | ' . ($entry['path'] ?? 'Unknown') . "\n";
    file_put_contents($logFile, $logLine, FILE_APPEND);
}

// Hvis det er en enkelt logg
if (isset($data['event'])) {
    appendLogEntry($logDir, $data);
}

// Hvis det er flere logs (fra localStorage)
elseif (isset($data['logs']) && is_array($data['logs'])) {
    foreach ($data['logs'] as $log) {
        appendLogEntry($logDir, $log);
    }
}

echo json_encode(['status' => 'success']);
?>
