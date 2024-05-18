function joinServer() {
    const serverLink = document.getElementById('serverLink').value;
    const regex = /https:\/\/www\.roblox\.com\/games\/(\d+)\/.*?privateServerLinkCode=(\w+)/;
    const match = serverLink.match(regex);

    if (match) {
        const placeId = match[1];
        const linkCode = match[2];
        const robloxUrl = `roblox://placeid=${placeId}&linkcode=${linkCode}`;

        // Open the Roblox URL
        window.location.href = robloxUrl;
    } else {
        alert('Invalid VIP Server Link. Please enter a valid link.');
    }
}
