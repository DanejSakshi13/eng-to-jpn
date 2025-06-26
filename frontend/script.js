const BACKEND_URL = "https://your-backend-url.onrender.com/translate"; // Replace with deployed backend URL

async function translate() {
  const input = document.getElementById("inputText").value;
  const output = document.getElementById("output");

  output.textContent = "Translating...";

  try {
    const res = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input })
    });

    const data = await res.json();
    output.textContent = data.translated || "No translation returned.";
  } catch (err) {
    output.textContent = "Error: " + err.message;
  }
}