// Utility function to convert Heroicon names to FontAwesome equivalents
export const convertHeroiconToFontAwesome = (heroicon) => {
  const iconMap = {
    // Communication & Chat
    'heroicon-o-chat-bubble-left-right': 'fas fa-comments',
    'heroicon-o-phone': 'fas fa-phone',
    'heroicon-o-envelope': 'fas fa-envelope',
    
    // Search & Navigation
    'heroicon-o-magnifying-glass': 'fas fa-search',
    'heroicon-o-map-pin': 'fas fa-map-marker-alt',
    'heroicon-o-globe-alt': 'fas fa-globe',
    
    // Documents & Files
    'heroicon-o-document-text': 'fas fa-file-alt',
    'heroicon-o-clipboard-document': 'fas fa-clipboard',
    'heroicon-o-folder': 'fas fa-folder',
    
    // Transportation
    'heroicon-o-truck': 'fas fa-truck',
    'heroicon-o-car': 'fas fa-car',
    
    // Security & Protection
    'heroicon-o-shield-check': 'fas fa-shield-alt',
    'heroicon-o-lock-closed': 'fas fa-lock',
    
    // Finance & Money
    'heroicon-o-currency-dollar': 'fas fa-dollar-sign',
    'heroicon-o-credit-card': 'fas fa-credit-card',
    'heroicon-o-banknotes': 'fas fa-money-bill',
    
    // Tools & Settings
    'heroicon-o-wrench-screwdriver': 'fas fa-tools',
    'heroicon-o-cog': 'fas fa-cog',
    'heroicon-o-adjustments-horizontal': 'fas fa-sliders-h',
    
    // Status & Feedback
    'heroicon-o-check-circle': 'fas fa-check-circle',
    'heroicon-o-x-circle': 'fas fa-times-circle',
    'heroicon-o-exclamation-triangle': 'fas fa-exclamation-triangle',
    'heroicon-o-information-circle': 'fas fa-info-circle',
    
    // Time & Calendar
    'heroicon-o-clock': 'fas fa-clock',
    'heroicon-o-calendar': 'fas fa-calendar',
    
    // People & Users
    'heroicon-o-user': 'fas fa-user',
    'heroicon-o-user-group': 'fas fa-users',
    'heroicon-o-user-circle': 'fas fa-user-circle',
    
    // Business & Professional
    'heroicon-o-briefcase': 'fas fa-briefcase',
    'heroicon-o-building-office': 'fas fa-building',
    'heroicon-o-academic-cap': 'fas fa-graduation-cap',
    
    // Charts & Analytics
    'heroicon-o-chart-bar': 'fas fa-chart-bar',
    'heroicon-o-chart-pie': 'fas fa-chart-pie',
    'heroicon-o-presentation-chart-line': 'fas fa-chart-line',
    
    // Media & Content
    'heroicon-o-photo': 'fas fa-image',
    'heroicon-o-video-camera': 'fas fa-video',
    'heroicon-o-musical-note': 'fas fa-music',
    
    // Actions & Controls
    'heroicon-o-play': 'fas fa-play',
    'heroicon-o-pause': 'fas fa-pause',
    'heroicon-o-stop': 'fas fa-stop',
    
    // Favorites & Ratings
    'heroicon-o-heart': 'fas fa-heart',
    'heroicon-o-star': 'fas fa-star',
    
    // Technology & Power
    'heroicon-o-lightning-bolt': 'fas fa-bolt',
    'heroicon-o-cpu-chip': 'fas fa-microchip',
    'heroicon-o-wifi': 'fas fa-wifi',
    
    // Shopping & Commerce
    'heroicon-o-shopping-cart': 'fas fa-shopping-cart',
    'heroicon-o-shopping-bag': 'fas fa-shopping-bag',
    'heroicon-o-gift': 'fas fa-gift',
    
    // Home & Location
    'heroicon-o-home': 'fas fa-home',
    'heroicon-o-building-storefront': 'fas fa-store',
    
    // Arrows & Directions
    'heroicon-o-arrow-right': 'fas fa-arrow-right',
    'heroicon-o-arrow-left': 'fas fa-arrow-left',
    'heroicon-o-arrow-up': 'fas fa-arrow-up',
    'heroicon-o-arrow-down': 'fas fa-arrow-down',
    
    // Miscellaneous
    'heroicon-o-fire': 'fas fa-fire',
    'heroicon-o-sun': 'fas fa-sun',
    'heroicon-o-moon': 'fas fa-moon',
    'heroicon-o-eye': 'fas fa-eye',
    'heroicon-o-eye-slash': 'fas fa-eye-slash'
  }
  
  return iconMap[heroicon] || 'fas fa-star' // Default fallback icon
}

// Alternative function for specific automotive context
export const convertAutomotiveIcons = (heroicon) => {
  const automotiveIconMap = {
    'heroicon-o-shield-check': 'fas fa-shield-check',
    'heroicon-o-truck': 'fas fa-shipping-fast',
    'heroicon-o-phone': 'fas fa-headset',
    'heroicon-o-document-text': 'fas fa-file-contract',
    'heroicon-o-currency-dollar': 'fas fa-dollar-sign',
    'heroicon-o-wrench-screwdriver': 'fas fa-tools',
    'heroicon-o-chat-bubble-left-right': 'fas fa-comments',
    'heroicon-o-magnifying-glass': 'fas fa-search',
    'heroicon-o-car': 'fas fa-car',
    'heroicon-o-cog': 'fas fa-cog'
  }
  
  return automotiveIconMap[heroicon] || convertHeroiconToFontAwesome(heroicon)
}