document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements (with fallbacks in case elements aren't found)
    const searchForm = document.getElementById('search-form');
    const searchBtn = document.getElementById('search-btn');
    const skipEmailBtn = document.getElementById('skip-email-btn');
    const thankYouSection = document.getElementById('thank-you');
    const messageContainer = document.querySelector('.message-container');
    const emailForm = document.getElementById('email-form');
    const emailSuccess = document.querySelector('.email-success');
    
    // Store the search query when button is clicked and show email form
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchInput = document.getElementById('search-input');
            
            if (searchInput && searchInput.value.trim() !== '') {
                const query = searchInput.value.trim();
                
                // Store the query for later use
                try {
                    localStorage.setItem('lastHealthQuery', query);
                    
                    // Update the hidden field in the email form
                    const querySavedInput = document.getElementById('query-saved');
                    if (querySavedInput) {
                        querySavedInput.value = query;
                    }
                } catch (err) {
                    // Ignore storage errors
                }
                
                // Hide search section, show thank you with email form
                messageContainer.classList.add('hidden');
                thankYouSection.classList.remove('hidden');
            }
        });
    }
    
    // Skip the email collection and submit just the query to Netlify
    if (skipEmailBtn) {
        skipEmailBtn.addEventListener('click', function() {
            // Get the query from localStorage
            const query = localStorage.getItem('lastHealthQuery') || '';
            
            // Submit the query directly to Netlify
            fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    'form-name': 'health-query',
                    'query': query
                })
            })
            .then(() => {
                // Hide the email form and show success message
                if (emailForm && emailSuccess) {
                    emailForm.classList.add('hidden');
                    document.querySelector('.skip-option').classList.add('hidden');
                    emailSuccess.classList.remove('hidden');
                }
            })
            .catch(error => console.error('Error submitting form:', error));
        });
    }
    
    // Handle the email form submission
    if (emailForm) {
        emailForm.addEventListener('submit', function(e) {
            const emailInput = document.getElementById('email-input');
            
            if (emailInput.value.trim() === '') {
                // If email is empty, just submit the query directly (like skip button)
                e.preventDefault();
                skipEmailBtn.click();
            }
            // Otherwise let the form submit normally to Netlify
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
                document.querySelector('.skip-option').classList.add('hidden');
                emailSuccess.classList.remove('hidden');
            }
        }
    }
});
