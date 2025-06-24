// Card Component for UI Kit
export function createCard(options = {}) {
  const {
    title = '',
    content = '',
    footer = '',
    className = '',
    onClick = null
  } = options;

  const card = document.createElement('div');
  card.className = `ui-card tw-p-6 ${className}`.trim();
  
  if (onClick) {
    card.style.cursor = 'pointer';
    card.addEventListener('click', onClick);
  }

  if (title) {
    const header = document.createElement('div');
    header.className = 'tw-mb-4';
    
    const titleElement = document.createElement('h3');
    titleElement.className = 'tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight';
    titleElement.textContent = title;
    
    header.appendChild(titleElement);
    card.appendChild(header);
  }

  if (content) {
    const contentElement = document.createElement('div');
    contentElement.className = 'tw-text-sm tw-text-muted-foreground';
    
    if (typeof content === 'string') {
      contentElement.textContent = content;
    } else {
      contentElement.appendChild(content);
    }
    
    card.appendChild(contentElement);
  }

  if (footer) {
    const footerElement = document.createElement('div');
    footerElement.className = 'tw-mt-4 tw-pt-4 tw-border-t';
    
    if (typeof footer === 'string') {
      footerElement.textContent = footer;
    } else {
      footerElement.appendChild(footer);
    }
    
    card.appendChild(footerElement);
  }

  return card;
}

// Usage example:
// const card = createCard({
//   title: 'Card Title',
//   content: 'This is some sample content for the card.',
//   footer: 'Card footer content',
//   className: 'tw-max-w-sm',
//   onClick: () => console.log('Card clicked!')
// }); 