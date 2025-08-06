document.addEventListener("DOMContentLoaded", () => {
  const sheetUrl = "teachers.csv"; 
  const tableBody = document.getElementById("teacher-table-body");

  fetch(sheetUrl)
    .then(response => response.text())
    .then(data => {
      const rows = data.trim().split(/\r?\n/);
      tableBody.innerHTML = "";

      rows.slice(1).forEach(row => {
        if (!row.trim()) return;
        // Regex splits CSV row correctly even if values are quoted and contain commas
        const cols = row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
        if (!cols || cols.length < 4) return;

        // Remove any surrounding quotes and trim whitespace
        const [name, subject, email, status] = cols.map(c => c.replace(/(^"|"$)/g, "").trim());

        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${name}</td>
          <td>${subject}</td>
          <td><a href="mailto:${email}">${email}</a></td>
          <td>${status}</td>
        `;
        tableBody.appendChild(tr);
      });

      if (!tableBody.hasChildNodes()) {
        tableBody.innerHTML = "<tr><td colspan='4'>No teachers found.</td></tr>";
      }
    })
    .catch(error => {
      console.error("Error loading teacher list:", error);
      tableBody.innerHTML = "<tr><td colspan='4'>Error loading teacher list.</td></tr>";
    });
});
