document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const formData = {
    name: this.name.value,
    email: this.email.value,
    message: this.message.value
  };

  try {
    const res = await fetch("http://localhost:5000/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();

    if (data.success) {
      alert("✅ Message sent successfully!");
      this.reset();
    } else {
      alert("❌ Failed to send message");
    }

  } catch (err) {
    alert("⚠️ Server error");
    console.error(err);
  }
});