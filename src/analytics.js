// src/lib/analytics.js
export const GA_MEASUREMENT_ID = 'G-1T6CLWS1GT' // Replace with your GA4 measurement ID

// Initialize Google Analytics
export const initGA = () => {
    // Add Google Analytics script to head
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    document.head.appendChild(script)

    // Initialize dataLayer and gtag function
    // @ts-ignore
    window.dataLayer = window.dataLayer || []
    // @ts-ignore
    window.gtag = function() {
        // @ts-ignore
        window.dataLayer.push(arguments)
    }
    
    // Configure GA4
    // @ts-ignore
    window.gtag('js', new Date())
    // @ts-ignore
    window.gtag('config', GA_MEASUREMENT_ID)
}

// Track custom events
export const trackEvent = (eventName, eventParams = {}) => {
    // @ts-ignore
    if (typeof window.gtag !== 'undefined') {
        // @ts-ignore
        window.gtag('event', eventName, eventParams)
    }
}