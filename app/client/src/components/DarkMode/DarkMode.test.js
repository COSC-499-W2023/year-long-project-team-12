


function toggleDarkMode() {
    const darkModeEnabled = document.body.classList.contains('dark-mode');
    document.body.classList.toggle('dark-mode', !darkModeEnabled);
    localStorage.setItem('darkMode', !darkModeEnabled);
}


function setInitialMode() {
    const darkModePreference = localStorage.getItem('darkMode');


    if (darkModePreference !== null) {
        document.body.classList.toggle('dark-mode', darkModePreference === 'true');
    }
}

document.getElementById('darkmode-toggle').addEventListener('click', toggleDarkMode);


document.addEventListener('DOMContentLoaded', setInitialMode);
