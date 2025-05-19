document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('search-form');
    const thankYouSection = document.getElementById('thank-you');
    const messageContainer = document.querySelector('.message-container');
    const emailForm = document.getElementById('email-form');
    const emailSuccess = document.querySelector('.email-success');
    
    // Handle the search form submission
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const searchInput = document.getElementById('search-input');
        const query = searchInput.value.trim();
        
        if (query !== '') {
            // Hide the messages
            messageContainer.classList.add('hidden');
            
            // Show the thank you message
            thankYouSection.classList.remove('hidden');
            
            // Clear the search input
            searchInput.value = '';
            
            // In a real application, you would send the query to a server here
            console.log('Search query:', query);
        }
    });
    
    // Handle the email form submission
    emailForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = document.getElementById('email-input');
        const email = emailInput.value.trim();
        
        if (email !== '') {
            // Hide the form
            emailForm.classList.add('hidden');
            
            // Show the success message
            emailSuccess.classList.remove('hidden');
            
            // In a real application, you would send the email to a server here
            console.log('Email submitted:', email);
        }
    });
});
