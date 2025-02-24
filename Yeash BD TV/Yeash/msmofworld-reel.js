document.addEventListener("DOMContentLoaded", function () {
    async function loadReels() {
        const m3uUrl = "https://raw.githubusercontent.com/msplayerapp/-Mitu/refs/heads/main/Yeash%20BD%20TV/Yeash/Yeash.m3u"; // আপনার GitHub লিংক দিন

        try {
            const response = await fetch(m3uUrl);
            if (!response.ok) throw new Error("Failed to load video list");

            const text = await response.text();
            const lines = text.split("\n");
            let reels = [];
            let title = "";

            lines.forEach(line => {
                if (line.startsWith("#EXTINF")) {
                    title = line.substring(line.indexOf(",") + 1).trim();
                } else if (line.startsWith("http")) {
                    reels.push({ title, url: line.trim() });
                }
            });

            const container = document.getElementById("reelsContainer");
            container.innerHTML = ""; // আগের কন্টেন্ট মুছে ফেলা

            reels = reels.sort(() => Math.random() - 0.5); // এলোমেলোভাবে সাজানো

            reels.forEach((reel, index) => {
                let reelElement = document.createElement("div");
                reelElement.className = "reel";
                reelElement.innerHTML = `
                    <video src="${reel.url}" autoplay loop muted playsinline></video>
                    <p>${reel.title}</p>
                `;
                container.appendChild(reelElement);
            });
        } catch (error) {
            console.error("Error loading videos:", error);
        }
    }

    loadReels();
});
