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
  const siteTitle = 'B5 EVENTORY | Premium Event Management';
  const defaultDescription = 'B5 EVENTORY is your premier event management company for weddings, corporate events, and parties. We deliver unforgettable experiences with professional event planning.';
  const defaultKeywords = 'Event Management Company, Wedding Planner, Corporate Event Organizer, Birthday Event Planner, Event Services, B5 EVENTORY';
  const siteUrl = 'https://b5eventory.com';
  
  const currentTitle = title ? `${title} | B5 EVENTORY` : siteTitle;
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
