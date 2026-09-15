#!/bin/bash

# Remove inline onclick handlers and add event listeners via JS
sed -i '' 's/onclick="acceptCookies()"//g' index.html
sed -i '' 's/onclick="declineCookies()"//g' index.html

# Update the script at bottom
cat > temp_script.js << 'SCRIPT'
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
SCRIPT

# Replace old script with new one
sed -i '' '/function acceptCookies/,/<\/script>/c\
<script>\
document.getElementById('\''accept-btn'\'').addEventListener('\''click'\'', function() {\
    localStorage.setItem('\''cookiesAccepted'\'', '\''true'\'');\
    document.getElementById('\''cookie-modal'\'').style.display = '\''none'\'';\
});\
document.getElementById('\''decline-btn'\'').addEventListener('\''click'\'', function() {\
    localStorage.setItem('\''cookiesAccepted'\'', '\''false'\'');\
    document.getElementById('\''cookie-modal'\'').style.display = '\''none'\'';\
});\
if(localStorage.getItem('\''cookiesAccepted'\'')) {\
    document.getElementById('\''cookie-modal'\'').style.display = '\''none'\'';\
}\
</script>' index.html

# Add IDs to buttons
sed -i '' 's/<button /<button id="accept-btn" /g' index.html
sed -i '' 's/<button /<button id="decline-btn" /g' index.html

echo "Fixed CSP issues"
