document.addEventListener('DOMContentLoaded', function() {
    var acceptBtn = document.getElementById('accept-btn');
    var declineBtn = document.getElementById('decline-btn');
    var modal = document.getElementById('cookie-modal');
    
    if(acceptBtn) {
        acceptBtn.addEventListener('click', function() {
            localStorage.setItem('cookiesAccepted', 'true');
            modal.style.display = 'none';
        });
    }
    
    if(declineBtn) {
        declineBtn.addEventListener('click', function() {
            localStorage.setItem('cookiesAccepted', 'false');
            modal.style.display = 'none';
        });
    }
    
    if(localStorage.getItem('cookiesAccepted') && modal) {
        modal.style.display = 'none';
    }
});
