document.addEventListener("DOMContentLoaded", () => {
  // teachers.csv must be in the same folder as teacherList.html
  const sheetUrl = "teachers.csv";  
  const tableBody = document.getElementById("teacher-table-body");

  Papa.parse(sheetUrl, {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function(results) {
      tableBody.innerHTML = "";

      results.data.forEach(row => {
        // Adjust these keys to match EXACT headers in teachers.csv
        const { "Teacher Name": name, Subject: subject, Email: email, Status: status } = row;

        if (!name || !subject || !email || !status) return;

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
    },
    error: function(error) {
      console.error("Error loading teacher list:", error);
      tableBody.innerHTML = "<tr><td colspan='4'>Error loading teacher list.</td></tr>";
    }
  });
});
