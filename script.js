async function joinServer() {
    const serverLink = document.getElementById('serverLink').value;

    // Check if the link is a share link
    const isShareLink = serverLink.startsWith('https://www.roblox.com/share?code=');

    let robloxLink;

    if (isShareLink) {
        try {
            const response = await fetch(serverLink);
            const finalUrl = response.url; // This should be the redirected URL
            const urlParams = new URLSearchParams(finalUrl.split('?')[1]);
            const gameId = urlParams.get('placeId');
            const linkCode = urlParams.get('privateServerLinkCode');
            robloxLink = `roblox://placeid=${gameId}&LinkCode=${linkCode}`;
        } catch (error) {
            alert('Failed to fetch the share link. Please try again.');
            console.error('Error fetching the share link:', error);
            return;
        }
    } else {
        // If it's a direct link
        const urlParams = new URLSearchParams(serverLink.split('?')[1]);
        const gameId = serverLink.match(/games\/(\d+)\//)[1];
        const linkCode = urlParams.get('privateServerLinkCode');
        robloxLink = `roblox://placeid=${gameId}&LinkCode=${linkCode}`;
    }

    window.location.href = robloxLink;
}
