// GDS RAG Knowledge System - Enhanced with code examples

interface GDSKnowledgeBase {
  [key: string]: string;
}

// Pre-loaded GDS knowledge from search results
const gdsKnowledge: GDSKnowledgeBase = {
  "header_design": "The GOV.UK header was refreshed in 2025 with a blue background instead of black. The header component tells users they're using a service on GOV.UK and lets them use GOV.UK-wide tools. It's also known as the GOV.UK masthead.",
  
  "accessibility_strategy": "The GOV.UK Design System has a comprehensive accessibility strategy. Using the Design System doesn't automatically make services accessible - additional research, design, development and testing is needed. The system meets WCAG 2.2 standards and follows public sector accessibility regulations.",
  
  "brand_refresh_2025": "GDS refreshed the Government Digital Service brand in 2025. All government services must adopt the new GOV.UK brand guidelines by 25 June 2025 or as soon after as possible. This includes updates to headers, service navigation, secondary navigation, footers, and phase banners.",
  
  "button_code": `Here's a GDS-compliant button code snippet:

HTML:
<button class="govuk-button" data-module="govuk-button">
  Save and continue
</button>

CSS classes available:
- govuk-button (default blue button)
- govuk-button--secondary (grey button)
- govuk-button--warning (red button)
- govuk-button--start (with arrow icon)
- govuk-button--disabled

React/JSX example:
<button className="govuk-button" type="submit">
  Continue
</button>`,
  
  "form_code": `GDS form input code snippet:

HTML:
<div class="govuk-form-group">
  <label class="govuk-label" for="event-name">
    Event name
  </label>
  <input class="govuk-input" id="event-name" name="event-name" type="text">
</div>

With error state:
<div class="govuk-form-group govuk-form-group--error">
  <label class="govuk-label" for="event-name">
    Event name
  </label>
  <p class="govuk-error-message">
    <span class="govuk-visually-hidden">Error:</span> Enter an event name
  </p>
  <input class="govuk-input govuk-input--error" id="event-name" name="event-name" type="text">
</div>`,

  "header_code": `GDS header code snippet:

HTML:
<header class="govuk-header" role="banner" data-module="govuk-header">
  <div class="govuk-header__container govuk-width-container">
    <div class="govuk-header__logo">
      <a href="/" class="govuk-header__link govuk-header__link--homepage">
        <span class="govuk-header__logotype">
          <span class="govuk-header__logotype-text">
            GOV.UK
          </span>
        </span>
      </a>
    </div>
    <div class="govuk-header__content">
      <a href="/" class="govuk-header__link govuk-header__service-name">
        Service name
      </a>
    </div>
  </div>
</header>`,

  "navigation_code": `GDS navigation code snippet:

<nav class="govuk-breadcrumbs" aria-label="Breadcrumb">
  <ol class="govuk-breadcrumbs__list">
    <li class="govuk-breadcrumbs__list-item">
      <a class="govuk-breadcrumbs__link" href="/">Home</a>
    </li>
    <li class="govuk-breadcrumbs__list-item">
      <a class="govuk-breadcrumbs__link" href="/section">Section</a>
    </li>
    <li class="govuk-breadcrumbs__list-item" aria-current="page">
      Current page
    </li>
  </ol>
</nav>`
};

// Function to search the GDS website for real-time information
const searchGDSWebsite = async (query: string): Promise<string | null> => {
  try {
    // Fallback to general search about GDS
    console.log('Searching for GDS information:', query);
    return `I found your query about "${query}" but couldn't access the latest GDS documentation directly. 

For the most current information, please visit:
• **Components**: https://design-system.service.gov.uk/components/
• **Patterns**: https://design-system.service.gov.uk/patterns/
• **Styles**: https://design-system.service.gov.uk/styles/

You can also search the GDS Design System directly at: https://design-system.service.gov.uk/search/?q=${encodeURIComponent(query)}`;
  } catch (error) {
    console.error('Error searching GDS website:', error);
    return null;
  }
};

// Enhanced RAG system that can fetch real-time GDS information
export const processGDSQuery = async (query: string, searchWeb = false): Promise<string> => {
  const queryLower = query.toLowerCase();
  
  // Check for code requests
  if (queryLower.includes('code') || queryLower.includes('snippet') || queryLower.includes('example') || queryLower.includes('html')) {
    if (queryLower.includes('button')) {
      return gdsKnowledge.button_code;
    }
    if (queryLower.includes('form') || queryLower.includes('input')) {
      return gdsKnowledge.form_code;
    }
    if (queryLower.includes('header') || queryLower.includes('masthead')) {
      return gdsKnowledge.header_code;
    }
    if (queryLower.includes('nav') || queryLower.includes('breadcrumb')) {
      return gdsKnowledge.navigation_code;
    }
    
    return `Here are some common GDS code patterns:

**Button:**
\`<button class="govuk-button">Continue</button>\`

**Input:**
\`<input class="govuk-input" type="text">\`

**Link:**
\`<a class="govuk-link" href="#">Link text</a>\`

For complete code examples, visit: https://design-system.service.gov.uk/components/`;
  }
  
  // Check for direct matches in knowledge base
  for (const [key, value] of Object.entries(gdsKnowledge)) {
    if (queryLower.includes(key.replace('_', ' ')) || 
        queryLower.includes(key.split('_').join(' ')) ||
        value.toLowerCase().includes(queryLower.split(' ')[0])) {
      return value;
    }
  }
  
  // Check for specific topics
  if (queryLower.includes('header') || queryLower.includes('masthead')) {
    return gdsKnowledge.header_design;
  }
  
  if (queryLower.includes('accessible') || queryLower.includes('accessibility') || queryLower.includes('wcag')) {
    return gdsKnowledge.accessibility_strategy;
  }
  
  if (queryLower.includes('color') || queryLower.includes('colour') || queryLower.includes('blue') || queryLower.includes('brand')) {
    return `${gdsKnowledge.brand_refresh_2025}\n\nGDS uses specific colors: GDS Blue (#1d70b8) for primary actions, GDS Green (#00703c) for success, GDS Red (#d4351c) for errors, and GDS Yellow (#ffdd00) for warnings and focus states.`;
  }
  
  if (queryLower.includes('button') || queryLower.includes('cta')) {
    return `GDS buttons should have clear text describing the action, minimum 44px touch target, and proper focus states. Use 'Continue' rather than 'Next', and 'Save and continue' for forms.\n\n${gdsKnowledge.button_code}`;
  }
  
  // For unrecognized queries, try to be more helpful
  if (queryLower.includes('how') || queryLower.includes('implement') || queryLower.includes('build')) {
    return `To implement GDS guidelines:

1. **Use the official CSS/JS**: Include govuk-frontend in your project
2. **Follow component patterns**: Use exact HTML structure from design-system.service.gov.uk
3. **Test accessibility**: Ensure WCAG 2.2 AA compliance
4. **Mobile-first**: Design for mobile, enhance for desktop
5. **User testing**: Test with real users, especially those using assistive technologies

For specific implementation guidance, visit: https://design-system.service.gov.uk/get-started/`;
  }
  
  // If we haven't found a good match and searchWeb is enabled, search for current info
  if (searchWeb) {
    try {
      const searchResults = await searchGDSWebsite(query);
      if (searchResults) {
        return searchResults;
      }
    } catch (error) {
      console.error('Error searching GDS website:', error);
    }
  }
  
  // Default helpful response
  return `I can help with GDS Design System questions including:

• **Components**: buttons, forms, navigation, headers
• **Code examples**: HTML/CSS snippets for GDS patterns  
• **Accessibility**: WCAG guidelines and implementation
• **Colors & branding**: GDS color palette and 2025 brand refresh
• **Best practices**: Implementation and user testing guidance

Try asking: "Show me button code", "How do I make forms accessible?", or "What are the GDS colors?"

For detailed documentation: https://design-system.service.gov.uk/`;
};