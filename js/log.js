// -------- LOGGING AV BRUK --------

// Finn OS ut fra userAgent (vi vil ikke logge hele UA-strengen)
function getOS() {
    const ua = navigator.userAgent;
    if (/iPhone|iPad|iPod/.test(ua)) return 'iOS';
    if (/CrOS/.test(ua)) return 'ChromeOS';
    if (/Android/.test(ua)) return 'Android';
    if (/Mac OS X/.test(ua)) return 'macOS';
    if (/Windows/.test(ua)) return 'Windows';
    if (/Linux/.test(ua)) return 'Linux';
    return 'Unknown';
}

// Funksjon for å logge hendelser
function logEvent(eventType) {
    const data = {
        event: eventType,
        timestamp: new Date().toISOString(),
        userAgent: getOS(),
        path: window.location.pathname
    };

    // Send til server
    fetch('/log_event.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).catch(() => {
        // Lagre lokalt hvis offline
        const logs = JSON.parse(localStorage.getItem('pyted_logs') || '[]');
        logs.push(data);
        localStorage.setItem('pyted_logs', JSON.stringify(logs));
    });
}

// Logg sidevisning når siden lastes
window.addEventListener('load', () => logEvent('page_view'));

// Send lagrede logs når nettverket kommer tilbake
window.addEventListener('online', () => {
    const logs = JSON.parse(localStorage.getItem('pyted_logs') || '[]');
    if (logs.length > 0) {
        fetch('/log_event.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ logs })
        }).then(() => localStorage.removeItem('pyted_logs'));
    }
});
