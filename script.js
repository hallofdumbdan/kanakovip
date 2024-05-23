async function joinServer() {
    const serverLink = document.getElementById('serverLink').value;

    if (!serverLink) {
        alert('Please enter a VIP server link.');
        return;
    }

    let robloxLink;

    // Check if the entered link is a sharelink
    if (serverLink.includes('roblox.com/share?code=')) {
        try {
            const proxyUrl = 'https://kanako-vip.glitch.me/proxy?url=';
            const response = await fetch(proxyUrl + encodeURIComponent(serverLink), { redirect: 'follow' });

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }

            const finalUrl = response.url; // Get the final redirected URL
            console.log(`Final URL: ${finalUrl}`);

            // Extract placeId and LinkCode from the final URL
            const urlParams = new URLSearchParams(new URL(finalUrl).search);
            const placeId = urlParams.get('placeId');
            const LinkCode = urlParams.get('LinkCode');

            if (placeId && LinkCode) {
                robloxLink = `roblox://placeid=${placeId}&LinkCode=${LinkCode}`;
                console.log(`Generated roblox link: ${robloxLink}`);
            } else {
                throw new Error('Invalid final URL format: missing placeId or LinkCode');
            }
        } catch (error) {
            alert(`Failed to fetch the share link. Please try again. Error: ${error.message}`);
            console.error('Error fetching the share link:', error);
            return;
        }
    } else {
        // Handle regular VIP server links (not sharelinks) here
        // You can keep your existing logic for parsing regular VIP server links
    }

    // Redirect the user to the generated Roblox VIP server join link
    window.location.href = robloxLink;
}
