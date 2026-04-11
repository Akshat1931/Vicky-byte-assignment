import { useEffect } from 'react';

/**
 * SEO Component: Replaces Next.js-style Head/Metadata logic for Vite.
 * Dynamically updates document title and meta tags for SEO/Social sharing.
 */
export default function SEO({ title, description, image, article }) {
  useEffect(() => {
    const siteTitle = 'StreamSphere';
    const fullTitle = title ? `${siteTitle} | ${title}` : `${siteTitle} | Live Streaming Platform`;
    
    // Update Title
    document.title = fullTitle;

    // Helper to update meta tags
    const updateMeta = (name, content, attr = 'name') => {
      if (!content) return;
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Standard Meta
    updateMeta('description', description || 'Experience high-fidelity live streaming on StreamSphere. Custom controls, real-time chat, and premium aesthetics.');
    
    // Open Graph (Social Sharing)
    updateMeta('og:title', fullTitle, 'property');
    updateMeta('og:description', description, 'property');
    updateMeta('og:type', article ? 'article' : 'website', 'property');
    if (image) updateMeta('og:image', image, 'property');
    
    // Twitter Card
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', fullTitle);
    updateMeta('twitter:description', description);
    if (image) updateMeta('twitter:image', image);

  }, [title, description, image, article]);

  return null; // Side-effect only component
}
