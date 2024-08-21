const translations = {
    es: {
        about: "About",
        art: "Art",
        programming: "Programming",
        blog: "Blog",
        historys: "Historys",
        gastronomy: "Gastronomy",
        description: "Descripción",
        rights: "Todos los derechos reservados.",
        language: "Idioma"
    },
    en: {
        about: "About",
        art: "Art",
        programming: "Programming",
        blog: "Blog",
        historys: "Historys",
        gastronomy: "Gastronomy",
        description: "Description",
        rights: "All rights reserved.",
        language: "Language"
    },
    jp: {
        about: "約",
        art: "アート",
        programming: "プログラミング",
        blog: "ブログ",
        historys: "物語",
        gastronomy: "ガストロノミー",
        description: "説明",
        rights: "全著作権所有。",
        language: "言語"
    }
};

function setLanguage(lang) {
    const elementsToTranslate = document.querySelectorAll('[data-key]');
    elementsToTranslate.forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    // Update the language selector text
    document.querySelector('.language-selector span').textContent = translations[lang].language;
}

// Detect browser language
function detectBrowserLanguage() {
    const userLang = navigator.language || navigator.userLanguage;
    const lang = userLang.split('-')[0]; // Get the language code (e.g., 'en', 'es', 'jp')
    if (translations[lang]) {
        setLanguage(lang);
    } else {
        setLanguage('en'); // Default to English if the language is not in the list
    }
}

// Set the default language on page load
document.addEventListener('DOMContentLoaded', detectBrowserLanguage);

// Language selection event
document.querySelectorAll('.language-options button').forEach(button => {
    button.addEventListener('click', (event) => {
        const selectedLang = event.target.getAttribute('data-lang');
        if (translations[selectedLang]) {
            setLanguage(selectedLang);
        }
    });
});
