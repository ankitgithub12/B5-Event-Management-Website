import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  canonicalUrl, 
  ogImage, 
  schema 
}) => {
  const siteTitle = 'B5 Eventory | Best Event Management Company in Jaipur | Corporate & Social Events';
  const defaultDescription = 'B5 Eventory is a leading event management company in Jaipur offering corporate events, exhibitions, conferences, brand activations, weddings, and complete event planning solutions.';
  const defaultKeywords = 'Event organizer in Jaipur Rajasthan, Destination wedding planner Jaipur, Affordable event planner Jaipur, Premium event planning services Jaipur, Event decoration and management Jaipur, Jaipur party planner services, Event Planner, Event Management Company, Corporate Event Planner, Exhibition Organizer, Conference Organizer, Wedding Planner, Brand Activation Agency, Event Services Jaipur';
  const siteUrl = 'https://b5eventory.com';
  
  const currentTitle = title 
    ? (title.toLowerCase().includes('b5 eventory') ? title : `${title} | B5 Eventory`) 
    : siteTitle;
  const currentDescription = description || defaultDescription;
  const currentUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;
  const currentKeywords = keywords || defaultKeywords;
  
  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{currentTitle}</title>
      <meta name="description" content={currentDescription} />
      <meta name="keywords" content={currentKeywords} />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={currentTitle} />
      <meta property="og:description" content={currentDescription} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:site_name" content="B5 EVENTORY" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={currentTitle} />
      <meta name="twitter:description" content={currentDescription} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* JSON-LD Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
