document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('search-form');
    const thankYouSection = document.getElementById('thank-you');
    const messageContainer = document.querySelector('.message-container');
    const emailForm = document.getElementById('email-form');
    const emailSuccess = document.querySelector('.email-success');
    const querySavedInput = document.getElementById('query-saved');
    let lastQuery = '';
    
    // Check if we're on a success page from Netlify form submission
    if (window.location.search.includes('success=true')) {
        // We're coming back after form submission
        messageContainer.classList.add('hidden');
        searchForm.classList.add('hidden');
        thankYouSection.classList.remove('hidden');
        
        // Check if it was the email form
        if (window.location.search.includes('form=email-subscription')) {
            emailForm.classList.add('hidden');
            emailSuccess.classList.remove('hidden');
        }
        return;
    }
    
    // Handle the search form submission
    searchForm.addEventListener('submit', function(e) {
        // We'll let the form submit to Netlify naturally for search-form,
        // but we'll save the query for the email form and show UI changes before redirecting
        
        const searchInput = document.getElementById('search-input');
        const query = searchInput.value.trim();
        
        if (query !== '') {
            // Save the query for the email form
            lastQuery = query;
            
            // Show UI changes before the form redirects
            messageContainer.classList.add('hidden');
            thankYouSection.classList.remove('hidden');
            
            // We'll let the form submit to Netlify now
            // The page will redirect to the success page
        } else {
            // If empty, prevent submission
            e.preventDefault();
        }
    });
    
    // Handle the email form submission
    emailForm.addEventListener('submit', function(e) {
        // Set the saved query value if we have one
        if (lastQuery) {
            querySavedInput.value = lastQuery;
        }
        
        const emailInput = document.getElementById('email-input');
        const email = emailInput.value.trim();
        
        if (email === '') {
            // If empty, prevent submission
            e.preventDefault();
        }
        
        // We'll let the form submit naturally to Netlify
        // The page will redirect to the success page
    });
});
