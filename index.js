// Mobile menu toggle with rotation
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.querySelector('.hamburger');
    navLinks.classList.toggle('show');
    hamburger.classList.toggle('rotate');
      }

      document.addEventListener("DOMContentLoaded", () => {
        const mainImages = document.querySelectorAll('.tab-content img');
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');
        const closeBtn = document.querySelector('.close');
        const prevBtn = document.querySelector('.prev');
        const nextBtn = document.querySelector('.next');
        const modalThumbnailsContainer = document.querySelector('.modal-thumbnails');
    
        let currentIndex = 0;
        const imageSources = Array.from(mainImages).map(img => img.src);
    
        // Create modal thumbnails
        imageSources.forEach((src, index) => {
            const thumb = document.createElement('img');
            thumb.src = src;
            thumb.dataset.index = index;
            thumb.addEventListener('click', () => {
                currentIndex = index;
                changeImage(currentIndex);
            });
            modalThumbnailsContainer.appendChild(thumb);
        });
    
        const modalThumbs = modalThumbnailsContainer.querySelectorAll('img');
    
        function updateActiveThumb() {
            modalThumbs.forEach(thumb => thumb.classList.remove('active-thumb'));
            modalThumbs[currentIndex].classList.add('active-thumb');
        }
    
        function changeImage(index) {
            modalImg.classList.remove('show');
            setTimeout(() => {
                modalImg.src = imageSources[index];
                modalImg.classList.add('show');
                updateActiveThumb();
            }, 100);
        }
    
        function openModal(index) {
            modal.style.display = 'block';
            currentIndex = index;
            changeImage(currentIndex);
        }
    
        function closeModal() {
            modal.style.display = 'none';
        }
    
        // Add event listeners for main images
        mainImages.forEach((img, index) => {
            img.addEventListener('click', () => {
                if (window.innerWidth > 400) {
                    openModal(index); // Desktop view - open when clicked
                }
            });
        });
    
        // Modal button controls
        closeBtn.addEventListener('click', closeModal);
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + imageSources.length) % imageSources.length;
            changeImage(currentIndex);
        });
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % imageSources.length;
            changeImage(currentIndex);
        });
    
        // Mobile auto-open on load if screen width <= 400px
        function handleMobileView() {
            if (window.innerWidth <= 400) {
                openModal(0); // Open with first image
            } else {
                closeModal(); // Close modal if resized back to desktop
            }
        }
    
        window.addEventListener('resize', handleMobileView);
        handleMobileView(); // Run once when page loads
    });
    