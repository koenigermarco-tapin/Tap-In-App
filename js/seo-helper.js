/**
 * TAP-IN SEO Helper
 * Automatically adds meta tags and structured data to pages
 */

(function() {
    'use strict';

    const SEOHelper = {
        init: function() {
            this.addMetaTags();
            this.addStructuredData();
        },

        addMetaTags: function() {
            const pageTitle = document.title || 'TAP-IN Leadership Platform';
            const pageDescription = this.getPageDescription();
            const pageUrl = window.location.href;
            const pageImage = this.getPageImage();

            // Add or update meta description
            let metaDesc = document.querySelector('meta[name="description"]');
            if (!metaDesc) {
                metaDesc = document.createElement('meta');
                metaDesc.setAttribute('name', 'description');
                document.head.appendChild(metaDesc);
            }
            metaDesc.setAttribute('content', pageDescription);

            // Add Open Graph tags
            this.setMetaProperty('og:title', pageTitle);
            this.setMetaProperty('og:description', pageDescription);
            this.setMetaProperty('og:url', pageUrl);
            this.setMetaProperty('og:type', 'website');
            this.setMetaProperty('og:image', pageImage);
            this.setMetaProperty('og:site_name', 'TAP-IN');

            // Add Twitter Card tags
            this.setMetaProperty('twitter:card', 'summary_large_image');
            this.setMetaProperty('twitter:title', pageTitle);
            this.setMetaProperty('twitter:description', pageDescription);
            this.setMetaProperty('twitter:image', pageImage);
        },

        setMetaProperty: function(property, content) {
            let meta = document.querySelector(`meta[property="${property}"]`);
            if (!meta) {
                meta = document.createElement('meta');
                meta.setAttribute('property', property);
                document.head.appendChild(meta);
            }
            meta.setAttribute('content', content);
        },

        getPageDescription: function() {
            // Try to find existing description
            const existing = document.querySelector('meta[name="description"]');
            if (existing && existing.content) {
                return existing.content;
            }

            // Generate description based on page type
            const path = window.location.pathname;
            const isDE = path.includes('-de.html') || document.documentElement.lang === 'de';

            if (path.includes('gym-dashboard')) {
                return isDE 
                    ? 'Verfolge deinen Fortschritt, setze dein Training fort und verbessere deine Leadership-Fähigkeiten.'
                    : 'Track your progress, continue your training, and level up your leadership skills.';
            }
            if (path.includes('learning-hub')) {
                return isDE
                    ? 'Entdecke Lernpfade, Module und praktische Tools für deine Leadership-Entwicklung.'
                    : 'Discover learning paths, modules, and practical tools for your leadership development.';
            }
            if (path.includes('belt-assessment')) {
                return isDE
                    ? 'Entdecke deinen Leadership-Stil und finde heraus, welcher Gürtel zu dir passt.'
                    : 'Discover your leadership style and find out which belt fits you.';
            }
            if (path.includes('game-')) {
                return isDE
                    ? 'Übe Leadership-Fähigkeiten durch interaktive Spiele und Szenarien.'
                    : 'Practice leadership skills through interactive games and scenarios.';
            }
            if (path.includes('tool-')) {
                return isDE
                    ? 'Praktische Tools für tägliche Leadership-Praxis und persönliche Entwicklung.'
                    : 'Practical tools for daily leadership practice and personal development.';
            }

            return isDE
                ? 'TAP-IN Leadership Platform - Entwickle deine Leadership-Fähigkeiten durch praktische Übung.'
                : 'TAP-IN Leadership Platform - Develop your leadership skills through embodied practice.';
        },

        getPageImage: function() {
            const ogImage = document.querySelector('meta[property="og:image"]');
            if (ogImage && ogImage.content) {
                return ogImage.content;
            }
            return window.location.origin + '/og-image.png';
        },

        addStructuredData: function() {
            // Remove existing structured data script if present
            const existing = document.querySelector('script[type="application/ld+json"]');
            if (existing) {
                return; // Don't override existing structured data
            }

            const path = window.location.pathname;
            const isDE = path.includes('-de.html') || document.documentElement.lang === 'de';

            let structuredData = {
                '@context': 'https://schema.org',
                '@type': 'WebApplication',
                name: 'TAP-IN',
                description: this.getPageDescription(),
                url: window.location.origin,
                applicationCategory: 'EducationalApplication',
                operatingSystem: 'Web',
                offers: {
                    '@type': 'Offer',
                    price: '0',
                    priceCurrency: 'USD'
                }
            };

            // Add Organization schema
            const organization = {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'TAP-IN',
                url: window.location.origin,
                logo: window.location.origin + '/icon-192.png'
            };

            // Add BreadcrumbList for navigation
            const breadcrumbs = this.generateBreadcrumbs();

            // Create script tags
            const script1 = document.createElement('script');
            script1.type = 'application/ld+json';
            script1.textContent = JSON.stringify(structuredData);
            document.head.appendChild(script1);

            const script2 = document.createElement('script');
            script2.type = 'application/ld+json';
            script2.textContent = JSON.stringify(organization);
            document.head.appendChild(script2);

            if (breadcrumbs) {
                const script3 = document.createElement('script');
                script3.type = 'application/ld+json';
                script3.textContent = JSON.stringify(breadcrumbs);
                document.head.appendChild(script3);
            }
        },

        generateBreadcrumbs: function() {
            const path = window.location.pathname;
            const segments = path.split('/').filter(s => s && !s.endsWith('.html'));
            if (segments.length === 0) return null;

            const items = [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Home',
                    item: window.location.origin
                }
            ];

            let url = window.location.origin;
            segments.forEach((segment, index) => {
                url += '/' + segment;
                items.push({
                    '@type': 'ListItem',
                    position: index + 2,
                    name: segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                    item: url
                });
            });

            return {
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: items
            };
        }
    };

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => SEOHelper.init());
    } else {
        SEOHelper.init();
    }
})();

