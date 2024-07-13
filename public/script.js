document.getElementById("embedForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
        title: formData.get("title"),
        description: formData.get("description"),
        field1: formData.get("field1"),
        value1: formData.get("value1"),
        field2: formData.get("field2"),
        value2: formData.get("value2"),
        image: formData.get("image"),
        color: formData.get("color"),
        thumbnail: formData.get("thumbnail"),
        footer: formData.get("footer"),
        channelId: formData.get("channelId")
    };

    try {
        const response = await fetch("/generate-embed", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        document.getElementById("response").textContent = result.success ? "Embed enviado com sucesso!" : `Erro: ${result.error}`;
    } catch (error) {
        document.getElementById("response").textContent = "Erro ao enviar embed.";
    }
});
