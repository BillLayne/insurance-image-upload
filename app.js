'use strict';

/**
 * Ethereal Blog - Dynamic Content Loader
 * * This script handles:
 * - Loading blog post data from an external JSON file
 * - Creating dynamic blog cards with new features (Featured, Icons, Read Time)
 * - Rendering interactive filter buttons
 * - Handling filtering logic
 * - Error handling and loading states
 * - Scroll-based animations
 * - Accessibility enhancements
 */

/**
 * Application State Management
 */
class EtherealBlog {
  constructor() {
    this.blogContainer = null;
    this.loadingState = null;
    this.errorState = null;
    this.filterContainer = null;
    this.allBlogs = [];
    this.activeFilter = 'All';
    this.init();
  }

  /**
   * Initialize the application
   */
  init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  /**
   * Setup DOM references and start loading
   */
  setup() {
    this.blogContainer = document.getElementById('blog-grid');
    this.loadingState = document.getElementById('loading-state');
    this.errorState = document.getElementById('error-state');
    this.filterContainer = document.getElementById('blog-filters');

    if (!this.blogContainer || !this.filterContainer) {
      console.error('Required DOM elements not found (blog-grid or blog-filters).');
      return;
    }
    
    // Load blog posts
    this.loadBlogs();
  }

  /**
   * Fetch blog data from the external JSON file
   */
  async loadBlogs() {
    try {
      this.showLoadingState();

      const response = await fetch('data/blogs.json');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      this.allBlogs = await response.json();

      if (!Array.isArray(this.allBlogs)) {
        throw new Error('Invalid blog data format');
      }

      this.hideLoadingState();
      this.renderFilterControls();
      this.renderBlogs(this.allBlogs);

    } catch (error) {
      console.error('Failed to load blogs:', error);
      this.showErrorState();
    }
  }

  /**
   * Show/Hide UI States
   */
  showLoadingState() {
    if (this.loadingState) this.loadingState.classList.remove('hidden');
    if (this.errorState) this.errorState.classList.add('hidden');
  }

  hideLoadingState() {
    if (this.loadingState) this.loadingState.classList.add('hidden');
  }

  showErrorState() {
    this.hideLoadingState();
    if (this.errorState) this.errorState.classList.remove('hidden');
  }

  /**
   * Render the filter buttons based on blog tags
   */
  renderFilterControls() {
    if (!this.filterContainer) return;

    // Get all unique tags
    const allTags = new Set(this.allBlogs.flatMap(blog => blog.tags));
    const filterTags = ['All', ...allTags];

    this.filterContainer.innerHTML = filterTags.map(tag => 
      `<button class="filter-btn ${tag === this.activeFilter ? 'active' : ''}" data-tag="${tag}">
        ${this.escapeHTML(tag)}
      </button>`
    ).join('');

    // Add event listeners to the new buttons
    this.filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => this.handleFilterClick(btn.dataset.tag));
    });
  }

  /**
   * Handle a click on a filter button
   */
  handleFilterClick(tag) {
    if (this.activeFilter === tag) return; // No change

    this.activeFilter = tag;

    // Update active class on buttons
    this.filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tag === this.activeFilter);
    });

    // Filter and re-render blogs
    const filteredBlogs = tag === 'All'
      ? this.allBlogs
      : this.allBlogs.filter(blog => blog.tags.includes(tag));
    
    this.renderBlogs(filteredBlogs);
  }

  /**
   * Render blog posts to the DOM
   */
  renderBlogs(blogData) {
    if (!this.blogContainer) return;

    this.blogContainer.innerHTML = ''; // Clear existing content

    if (blogData.length === 0) {
      this.blogContainer.innerHTML = `<p class="error-state">No articles found for this category.</p>`;
      return;
    }

    const fragment = document.createDocumentFragment();
    
    blogData.forEach((blog) => {
      const blogCard = this.createBlogCard(blog);
      fragment.appendChild(blogCard);
    });

    this.blogContainer.appendChild(fragment);

    // Re-trigger staggered fade-in effect
    setTimeout(() => {
      const cards = this.blogContainer.querySelectorAll('.blog-card');
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('visible');
        }, index * 100);
      });
    }, 50);
  }

  /**
   * Create individual blog card element with new features
   */
  createBlogCard(blog) {
    const card = document.createElement('a');
    card.className = 'blog-card';
    card.href = blog.linkUrl;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.setAttribute('aria-label', `Read blog post: ${blog.title}`);

    // Add featured class if applicable
    if (blog.featured) {
      card.classList.add('blog-card--featured');
    }

    const tagsHTML = blog.tags.map(tag => 
      `<span class="blog-tag" role="listitem">${this.escapeHTML(tag)}</span>`
    ).join('');

    // NOTE: The 'readTime' property needs to be added to your data/blogs.json file
    const readTimeHTML = blog.readTime ? `<span class="blog-card-read-time">${blog.readTime}</span>` : '';

    card.innerHTML = `
      <article class="blog-card-article">
        <div class="blog-card-image" role="img" aria-label="${blog.title}">
          </div>
        <div class="blog-card-content">
          <div class="blog-card-tags" role="list" aria-label="Post tags">
            ${tagsHTML}
          </div>
          <h3 class="blog-card-title">${this.escapeHTML(blog.title)}</h3>
          <div class="blog-card-meta">
            <time class="blog-card-date" datetime="${this.formatDatetime(blog.date)}">${blog.date}</time>
            ${readTimeHTML}
          </div>
          <p class="blog-card-summary">${this.escapeHTML(blog.summary)}</p>
        </div>
      </article>
    `;

    const imageDiv = card.querySelector('.blog-card-image');

    // Apply background image or thematic icon
    if (blog.imageUrl) {
      imageDiv.style.backgroundImage = `url(${blog.imageUrl})`;
    } else {
      // Use thematic icon if no image is available
      const primaryTag = blog.tags.length > 0 ? blog.tags[0] : 'default';
      imageDiv.innerHTML = this.getIconForTag(primaryTag);
    }
    
    card.addEventListener('keydown', this.handleCardKeydown.bind(this));

    return card;
  }
  
  /**
   * Helper function to return an SVG icon based on a tag
   */
  getIconForTag(tag) {
    const iconMap = {
      'Home Insurance': '<svg class="icon" ... path for home ...></svg>', // Add SVG code here
      'Auto Insurance': '<svg class="icon" ... path for car ...></svg>',  // Add SVG code here
      'Life Insurance': '<svg class="icon" ... path for life ...></svg>',  // Add SVG code here
      'Safety': '<svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" /></svg>',
      'default': '<span>🛡️</span>'
    };
    const safeTag = Object.keys(iconMap).find(key => tag.includes(key)) || 'default';
    return iconMap[safeTag];
  }


  /**
   * Utility Functions
   */
  formatDatetime(dateString) {
    try {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    } catch {
      return dateString;
    }
  }

  escapeHTML(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  handleCardKeydown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.currentTarget.click();
    }
  }
}

/**
 * Initialize the application when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
  new EtherealBlog();
  console.log('🛡️ Bill Layne Insurance Blog initialized successfully');
});

/**
 * Handle any uncaught errors gracefully
 */
window.addEventListener('error', (event) => {
  console.error('Ethereal Blog Error:', event.error);
  const errorContainer = document.getElementById('error-state');
  if (errorContainer) {
    errorContainer.classList.remove('hidden');
  }
});
