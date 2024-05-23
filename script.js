async function joinServer() {
    const serverLink = document.getElementById('serverLink').value;

    if (!serverLink) {
        alert('Please enter a VIP server link.');
        return;
    }

    // Check if the link is a share link
    const isShareLink = serverLink.startsWith('https://www.roblox.com/share?code=');

    let robloxLink;

    if (isShareLink) {
        try {
            // Fetch the share link to resolve the final URL
            const response = await fetch(serverLink, { redirect: 'follow' });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const finalUrl = response.url; // This should be the redirected URL
            const urlParams = new URLSearchParams(finalUrl.split('?')[1]);
            const gameId = urlParams.get('placeId');
            const linkCode = urlParams.get('privateServerLinkCode');

            if (gameId && linkCode) {
                robloxLink = `roblox://placeid=${gameId}&LinkCode=${linkCode}`;
            } else {
                throw new Error('Invalid final URL format');
            }
        } catch (error) {
            alert('Failed to fetch the share link. Please try again.');
            console.error('Error fetching the share link:', error);
            return;
        }
    } else {
        // If it's a direct link
        try {
            const urlParams = new URLSearchParams(serverLink.split('?')[1]);
            const gameId = serverLink.match(/games\/(\d+)\//)[1];
            const linkCode = urlParams.get('privateServerLinkCode');

            if (gameId && linkCode) {
                robloxLink = `roblox://placeid=${gameId}&LinkCode=${linkCode}`;
            } else {
                throw new Error('Invalid VIP server link format');
            }
        } catch (error) {
            alert('Invalid VIP server link. Please enter a valid link.');
            console.error('Error parsing the direct link:', error);
            return;
        }
    }

    // Redirect to the roblox:// link
    window.location.href = robloxLink;
}
