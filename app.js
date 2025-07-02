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

  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    this.blogContainer = document.getElementById('blog-grid');
    this.loadingState = document.getElementById('loading-state');
    this.errorState = document.getElementById('error-state');
    this.filterContainer = document.getElementById('blog-filters');

    if (!this.blogContainer || !this.filterContainer) {
      console.error('Required DOM elements not found (blog-grid or blog-filters).');
      return;
    }
    
    this.loadBlogs();
  }

  async loadBlogs() {
    try {
      this.showLoadingState();
      const response = await fetch('data/blogs.json');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      this.allBlogs = await response.json();
      if (!Array.isArray(this.allBlogs)) throw new Error('Invalid blog data format');
      this.hideLoadingState();
      this.renderFilterControls();
      this.renderBlogs(this.allBlogs);
    } catch (error) {
      console.error('Failed to load blogs:', error);
      this.showErrorState();
    }
  }

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

  renderFilterControls() {
    const allTags = new Set(this.allBlogs.flatMap(blog => blog.tags));
    const filterTags = ['All', ...allTags];
    this.filterContainer.innerHTML = filterTags.map(tag => 
      `<button class="filter-btn ${tag === this.activeFilter ? 'active' : ''}" data-tag="${tag}">
        ${this.escapeHTML(tag)}
      </button>`
    ).join('');
    this.filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => this.handleFilterClick(btn.dataset.tag));
    });
  }

  handleFilterClick(tag) {
    if (this.activeFilter === tag) return;
    this.activeFilter = tag;
    this.filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tag === this.activeFilter);
    });
    const filteredBlogs = tag === 'All'
      ? this.allBlogs
      : this.allBlogs.filter(blog => blog.tags.includes(tag));
    this.renderBlogs(filteredBlogs);
  }

  renderBlogs(blogData) {
    this.blogContainer.innerHTML = '';
    if (blogData.length === 0) {
      this.blogContainer.innerHTML = `<p class="error-state" style="opacity: 1;">No articles found for this category.</p>`;
      return;
    }
    const fragment = document.createDocumentFragment();
    blogData.forEach(blog => fragment.appendChild(this.createBlogCard(blog)));
    this.blogContainer.appendChild(fragment);
    setTimeout(() => {
      this.blogContainer.querySelectorAll('.blog-card').forEach((card, index) => {
        setTimeout(() => card.classList.add('visible'), index * 100);
      });
    }, 50);
  }

  createBlogCard(blog) {
    const card = document.createElement('a');
    card.className = 'blog-card';
    card.href = blog.linkUrl;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.setAttribute('aria-label', `Read blog post: ${blog.title}`);
    if (blog.featured) card.classList.add('blog-card--featured');

    const tagsHTML = blog.tags.map(tag => `<span class="blog-tag">${this.escapeHTML(tag)}</span>`).join('');
    const readTimeHTML = blog.readTime ? `<span class="blog-card-read-time">${blog.readTime}</span>` : '';

    card.innerHTML = `
      <article class="blog-card-article">
        <div class="blog-card-image" role="img" aria-label="${blog.title}"></div>
        <div class="blog-card-content">
          <div class="blog-card-tags">${tagsHTML}</div>
          <h3 class="blog-card-title">${this.escapeHTML(blog.title)}</h3>
          <div class="blog-card-meta">
            <time class="blog-card-date" datetime="${this.formatDatetime(blog.date)}">${blog.date}</time>
            ${readTimeHTML}
          </div>
          <p class="blog-card-summary">${this.escapeHTML(blog.summary)}</p>
        </div>
      </article>`;

    const imageDiv = card.querySelector('.blog-card-image');
    if (blog.imageUrl) {
      imageDiv.style.backgroundImage = `url(${blog.imageUrl})`;
    } else {
      imageDiv.innerHTML = this.getIconForTag(blog.tags[0] || 'default');
    }
    
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
    return card;
  }
  
  getIconForTag(tag) {
    // Placeholder icons - replace with actual SVG paths
    const iconMap = {
      'Home Insurance': '<svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>',
      'Auto Insurance': '<svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>',
      'Life Insurance': '<svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>',
      'Safety': '<svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',
      'default': '<svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z"></path></svg>'
    };
    const safeTag = Object.keys(iconMap).find(key => tag.toLowerCase().includes(key.toLowerCase().split(' ')[0])) || 'default';
    return iconMap[safeTag];
  }

  formatDatetime(dateString) {
    try {
      return new Date(dateString).toISOString().split('T')[0];
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
}

function initEnhancedAnimations() {
  const cards = document.querySelectorAll('.blog-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const percentX = (x - centerX) / centerX;
      const percentY = (y - centerY) / centerY;
      card.style.transform = `perspective(1000px) rotateY(${percentX * 3}deg) rotateX(${percentY * -3}deg) translateZ(10px) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  new EtherealBlog();
  // We call this here so it can re-apply animations to newly filtered cards if needed.
  const observer = new MutationObserver((mutations) => {
    if (mutations.some(m => m.addedNodes.length > 0)) {
      initEnhancedAnimations();
    }
  });
  observer.observe(document.getElementById('blog-grid'), { childList: true });
});
