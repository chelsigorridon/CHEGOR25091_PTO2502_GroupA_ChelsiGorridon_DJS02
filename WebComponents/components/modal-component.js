/**
 * HTML template for the ModalComponent.
 * Contains modal structure, styles, and placeholders for dynamic content.
 */
export const template = document.createElement('template')

template.innerHTML = `
<style>

.modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal-content {
  background: white;
  max-width: 900px;
  width: 90%;
  padding: 2rem;
  border-radius: 8px;
  position: relative;
  overflow-y: auto;
  max-height: 90vh;
}

.title-section {
  display: flex;
}

.title-section h2 {
  margin-top: 0px;
}

.banner {
  display: flex;
}

.info-section {
  margin-left: 10px;
}

.info-section h3 {
  margin: 0px;
}

.info-section p {
  color: var(--grey-text);
}

.modal-img {
  width: 45%;
  border-radius: 6px;
  align-self: flex-start;
  height: auto;
}

.modal-updated-text {
  font-size: 0.8rem;
  color: var(--grey-text);
  margin-top: 25px;
}

.season-list {
  padding-left: 0px;
}

.season-item {
  list-style: none;
  display: flex;
  justify-content: space-between;
  border: 1px solid rgb(223, 218, 218);
  border-radius: 6px;
  padding: 20px 12px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.episodes {
  color: var(--grey-text);
  font-size: 0.75rem;
}

.close-btn {
  position: absolute;
  right: 1rem;
  top: 1rem;
  background: transparent;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.close-btn:hover {
  color: red;
  transform: scale(1.2);
}

.hidden {
  display: none;
}

  </style>

   <div id="modal" class="modal hidden">
      <div class="modal-content">
        <div class="title-section">
          <h2 id="modalTitle"></h2>
          <button class="close-btn" id="closeModal">&times;</button>
        </div>
        <div class="banner">
          <img id="modalImage" class="modal-img" />
          <div class="info-section">
            <h3>Description</h3>
            <p id="modalDesc"></p>
            <h3>Genres</h3>
            <div id="modalGenres" class="tags"></div>
            <p id="modalUpdated" class="modal-updated-text"></p>
          </div>
        </div>
        <h3>Seasons</h3>
        <ul id="seasonList" class="season-list"></ul>
      </div>
    </div> 
 
  `;

  /**
 * ModalComponent is a custom element that displays detailed information
 * about a podcast, including title, description, genres, updated date, and seasons.
 * 
 * @customElement modal-component
 */

  class ModalComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

 /**
   * Called when the component is added to the DOM.
   * Sets up event listeners for closing the modal and for listening to
   * the custom 'card-selected' event to populate the modal data.
   */

  connectedCallback() {
    const closeBtn = this.shadowRoot.querySelector('#closeModal');
    const modal = this.shadowRoot.querySelector('#modal');

  // Close modal when close button is clicked

      closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
    });

    // Close modal when clicking outside modal content

      modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.add('hidden');
    });

    // Listen for custom event 'card-selected' to display modal

      document.body.addEventListener('card-selected', (event) => {
      const data = event.detail;
      this.show(data);
    });
  }

    /**
   * Populates and displays the modal with provided data.
   * 
   * @param {Object} data - Podcast data object
   * @param {string} data.title - Title of the podcast
   * @param {string} data.image - URL of the podcast image
   * @param {string} [data.description] - Description text
   * @param {string} [data.updated] - Last updated text
   * @param {string} [data.genres] - Comma-separated list of genre names
   * @param {number} [data.seasons] - Number of seasons
   */


  show(data) {
    const modal = this.shadowRoot.querySelector('#modal');
    this.shadowRoot.querySelector('#modalTitle').textContent = data.title;
    this.shadowRoot.querySelector('#modalImage').src = data.image;
    this.shadowRoot.querySelector('#modalDesc').textContent = data.description || '';
    this.shadowRoot.querySelector('#modalUpdated').textContent = `Updated: ${data.updated || ''}`;


    // Render genres

     const genresDiv = this.shadowRoot.querySelector('#modalGenres');
    genresDiv.innerHTML = ''; 
    if (data.genres) {
      data.genres.split(',').forEach((g) => {
        const tag = document.createElement('span');
        tag.textContent = g.trim();
        tag.style.marginRight = '6px';
        tag.style.padding = '2px 6px';
        tag.style.background = '#eee';
        tag.style.borderRadius = '4px';
        genresDiv.appendChild(tag);
      });
    }

     // Render seasons

      const seasonList = this.shadowRoot.querySelector('#seasonList');
    seasonList.innerHTML = '';
    if (data.seasons) {
      for (let i = 1; i <= data.seasons; i++) {
        const li = document.createElement('li');
        li.className = 'season-item';
        li.textContent = `Season ${i}`;
        seasonList.appendChild(li);
      }
    }


    // Show modal
    
    modal.classList.remove('hidden');
  }
}

// Register the custom element

customElements.define('modal-component', ModalComponent);



