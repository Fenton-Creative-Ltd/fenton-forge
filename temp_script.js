<script>
document.getElementById('accept-btn').addEventListener('click', function() {
    localStorage.setItem('cookiesAccepted', 'true');
    document.getElementById('cookie-modal').style.display = 'none';
});
document.getElementById('decline-btn').addEventListener('click', function() {
    localStorage.setItem('cookiesAccepted', 'false');
    document.getElementById('cookie-modal').style.display = 'none';
});
if(localStorage.getItem('cookiesAccepted')) {
    document.getElementById('cookie-modal').style.display = 'none';
}
</script>
