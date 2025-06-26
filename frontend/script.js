const BACKEND_URL = "https://eng-to-jpn.onrender.com/translate";

async function translate() {
  const input = document.getElementById("input").value;
  const output = document.getElementById("output");

  output.textContent = "Translating...";

  try {
    const res = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input })
    });

    const data = await res.json();
    output.textContent = data.translation || "No translation returned.";
  } catch (err) {
    output.textContent = "Error: " + err.message;
  }
}
