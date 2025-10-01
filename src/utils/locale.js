export async function getServerLocale(searchParams) {
    try {
        const params = await searchParams
        const urlLocale = params?.locale
        if (urlLocale && ['az', 'ru', 'en'].includes(urlLocale)) {
            return urlLocale
        }
    } catch (error) {
        return 'az'
    }
    return 'az'
}

export function getClientLocale() {
    if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search)
        const urlLocale = urlParams.get('locale')
        if (urlLocale && ['az', 'ru', 'en'].includes(urlLocale)) {
            return urlLocale
        }

        const storageLocale = localStorage.getItem('locale')
        if (storageLocale && ['az', 'ru', 'en'].includes(storageLocale)) {
            return storageLocale
        }
    }

    return 'az' // Default locale
}

export function setClientLocale(locale) {
    if (typeof window !== 'undefined' && ['az', 'ru', 'en'].includes(locale)) {
        localStorage.setItem('locale', locale)

        // Update URL
        const url = new URL(window.location)
        url.searchParams.set('locale', locale)
        window.history.replaceState({}, '', url)

        // Dispatch custom event to notify components
        window.dispatchEvent(new CustomEvent('localeChange', {detail: {locale}}))
    }
}
