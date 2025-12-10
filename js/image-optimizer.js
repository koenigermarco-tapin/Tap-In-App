/**
 * TAP-IN Image Optimizer
 * Adds lazy loading and optimizes image loading
 */

(function() {
    'use strict';

    const ImageOptimizer = {
        init: function() {
            this.addLazyLoading();
            this.optimizeImages();
            this.addImageErrorHandling();
        },

        addLazyLoading: function() {
            // Add loading="lazy" to all images that don't have it
            document.querySelectorAll('img:not([loading])').forEach(img => {
                // Skip images above the fold (first 3)
                const rect = img.getBoundingClientRect();
                if (rect.top < window.innerHeight * 2) {
                    return; // Already in viewport or close
                }
                
                img.setAttribute('loading', 'lazy');
                img.setAttribute('decoding', 'async');
            });

            // Use Intersection Observer for better lazy loading control
            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            
                            // Load image if it has data-src
                            if (img.dataset.src) {
                                img.src = img.dataset.src;
                                img.removeAttribute('data-src');
                            }
                            
                            // Add fade-in effect
                            img.style.opacity = '0';
                            img.style.transition = 'opacity 0.3s';
                            img.onload = () => {
                                img.style.opacity = '1';
                            };
                            
                            observer.unobserve(img);
                        }
                    });
                }, {
                    rootMargin: '50px' // Start loading 50px before image enters viewport
                });

                // Observe all images
                document.querySelectorAll('img').forEach(img => {
                    imageObserver.observe(img);
                });
            }
        },

        optimizeImages: function() {
            // Add responsive image attributes where missing
            document.querySelectorAll('img').forEach(img => {
                // Add width and height to prevent layout shift
                if (!img.hasAttribute('width') && !img.hasAttribute('height')) {
                    img.onload = function() {
                        if (this.naturalWidth && this.naturalHeight) {
                            // Set aspect ratio to prevent layout shift
                            this.style.aspectRatio = `${this.naturalWidth} / ${this.naturalHeight}`;
                        }
                    };
                }

                // Add alt text if missing
                if (!img.hasAttribute('alt')) {
                    // Try to infer from context
                    const context = this.getImageContext(img);
                    if (context) {
                        img.setAttribute('alt', context);
                    } else {
                        img.setAttribute('alt', ''); // Decorative image
                    }
                }
            });
        },

        getImageContext: function(img) {
            // Try to find context from surrounding elements
            const parent = img.closest('.card, .section, article');
            if (parent) {
                const title = parent.querySelector('h1, h2, h3, .title');
                if (title) {
                    return `${title.textContent.trim()} illustration`;
                }
            }

            // Try aria-label or title
            return img.getAttribute('aria-label') || img.getAttribute('title') || '';
        },

        addImageErrorHandling: function() {
            // Handle broken images gracefully
            document.querySelectorAll('img').forEach(img => {
                img.addEventListener('error', function() {
                    // Replace with placeholder or hide
                    this.style.display = 'none';
                    
                    // Or show a placeholder
                    const placeholder = document.createElement('div');
                    placeholder.className = 'image-placeholder';
                    placeholder.style.cssText = 'background: #2a2a3a; color: #8a8a9a; display: flex; align-items: center; justify-content: center; min-height: 200px; border-radius: 8px;';
                    placeholder.textContent = 'Image not available';
                    placeholder.setAttribute('aria-label', 'Image failed to load');
                    
                    this.parentNode.insertBefore(placeholder, this);
                }, { once: true });
            });
        }
    };

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => ImageOptimizer.init());
    } else {
        ImageOptimizer.init();
    }
})();

