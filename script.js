document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements (with fallbacks in case elements aren't found)
    const searchForm = document.getElementById('search-form');
    const thankYouSection = document.getElementById('thank-you');
    const messageContainer = document.querySelector('.message-container');
    const emailForm = document.getElementById('email-form');
    const emailSuccess = document.querySelector('.email-success');
    
    // Basic form submit handling without complex Netlify handling
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            // Let the form submit normally to Netlify
            const searchInput = document.getElementById('search-input');
            
            if (searchInput && searchInput.value.trim() === '') {
                e.preventDefault(); // Prevent empty submissions
            } else if (thankYouSection && messageContainer) {
                // Just store the query in localStorage for potential future use
                try {
                    localStorage.setItem('lastHealthQuery', searchInput.value.trim());
                } catch (err) {
                    // Ignore storage errors
                }
                
                // Show thank you section
                messageContainer.classList.add('hidden');
                thankYouSection.classList.remove('hidden');
            }
        });
    }
    
    // Handle the email form submission
    if (emailForm) {
        // Try to pre-populate the saved query from localStorage if available
        try {
            const savedQuery = localStorage.getItem('lastHealthQuery');
            const querySavedInput = document.getElementById('query-saved');
            
            if (savedQuery && querySavedInput) {
                querySavedInput.value = savedQuery;
            }
        } catch (err) {
            // Ignore storage errors
        }
        
        emailForm.addEventListener('submit', function(e) {
            const emailInput = document.getElementById('email-input');
            
            if (emailInput && emailInput.value.trim() === '') {
                e.preventDefault(); // Prevent empty submissions
            } else if (emailSuccess) {
                // Show success message
                emailForm.classList.add('hidden');
                emailSuccess.classList.remove('hidden');
            }
        });
    }
    
    // Handle success URL parameters (Netlify redirects back with ?success=true)
    if (window.location.search.includes('success=true')) {
        if (thankYouSection && messageContainer && searchForm) {
            messageContainer.classList.add('hidden');
            searchForm.classList.add('hidden');
            thankYouSection.classList.remove('hidden');
            
            if (emailForm && emailSuccess) {
                emailForm.classList.add('hidden');
                emailSuccess.classList.remove('hidden');
            }
        }
    }
});
