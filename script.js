const daysContainer = document.getElementById("days");
const matchesContainer = document.getElementById("matches");
let today = new Date();

// ✅ توليد 7 أيام
for (let i = 0; i < 7; i++) {
  let date = new Date();
  date.setDate(today.getDate() + i);
  let dayBtn = document.createElement("div");
  dayBtn.classList.add("day");
  if (i === 0) dayBtn.classList.add("active");
  dayBtn.innerHTML = `
    <span>${date.toLocaleDateString("ar-EG", { weekday: "short" })}</span><br>
    <small>${date.getDate()}/${date.getMonth() + 1}</small>
  `;
  dayBtn.onclick = () => {
    document.querySelectorAll(".day").forEach(d => d.classList.remove("active"));
    dayBtn.classList.add("active");
    loadMatches(date);
  };
  daysContainer.appendChild(dayBtn);
}

// ✅ مباريات وهمية
const fakeMatches = {
  "2025-09-03": [
    { home: "الأهلي", away: "الزمالك", time: "19:00" },
    { home: "برشلونة", away: "ريال مدريد", time: "22:00" }
  ],
  "2025-09-04": [
    { home: "ليفربول", away: "مان سيتي", time: "21:00" }
  ]
};

// ✅ تحميل المباريات
function loadMatches(date) {
  matchesContainer.innerHTML = "";
  let key = date.toISOString().split("T")[0];
  if (fakeMatches[key]) {
    fakeMatches[key].forEach(match => {
      let card = document.createElement("div");
      card.classList.add("match-card");
      card.innerHTML = `
        <div class="match-info">
          <strong>${match.home}</strong> 🆚 <strong>${match.away}</strong><br>
          ⏰ ${match.time}
        </div>
        <a href="match.html" class="live-btn">مشاهدة</a>
      `;
      matchesContainer.appendChild(card);
    });
  } else {
    matchesContainer.innerHTML = "<p style='text-align:center'>لا توجد مباريات لهذا اليوم ⚽</p>";
  }
}

// ✅ تحميل مباريات النهاردة
loadMatches(today);
