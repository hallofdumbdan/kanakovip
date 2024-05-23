async function joinServer() {
    const serverLink = document.getElementById('serverLink').value;

    if (!serverLink) {
        alert('Please enter a VIP server link.');
        return;
    }

    const isShareLink = serverLink.startsWith('https://www.roblox.com/share?code=');

    let robloxLink;

    if (isShareLink) {
        try {
            const proxyUrl = 'https://kanako-vip.glitch.me/proxy?url=';
            const response = await fetch(proxyUrl + encodeURIComponent(serverLink), { redirect: 'follow' });

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }

            const finalUrl = await response.text(); // Get the final redirected URL as text
            console.log(`Final URL: ${finalUrl}`);

            const urlParams = new URLSearchParams(new URL(finalUrl).search);
            const gameId = urlParams.get('placeId');
            const linkCode = urlParams.get('privateServerLinkCode');

            if (gameId && linkCode) {
                robloxLink = `roblox://placeid=${gameId}&LinkCode=${linkCode}`;
                console.log(`Generated roblox link: ${robloxLink}`);
            } else {
                throw new Error('Invalid final URL format: missing placeId or privateServerLinkCode');
            }
        } catch (error) {
            alert(`Failed to fetch the share link. Please try again. Error: ${error.message}`);
            console.error('Error fetching the share link:', error);
            return;
        }
    } else {
        try {
            const urlParams = new URLSearchParams(serverLink.split('?')[1]);
            const gameId = serverLink.match(/games\/(\d+)\//)[1];
            const linkCode = urlParams.get('privateServerLinkCode');

            if (gameId && linkCode) {
                robloxLink = `roblox://placeid=${gameId}&LinkCode=${linkCode}`;
                console.log(`Generated roblox link: ${robloxLink}`);
            } else {
                throw new Error('Invalid VIP server link format');
            }
        } catch (error) {
            alert('Invalid VIP server link. Please enter a valid link.');
            console.error('Error parsing the direct link:', error);
            return;
        }
    }

    window.location.href = robloxLink;
}
