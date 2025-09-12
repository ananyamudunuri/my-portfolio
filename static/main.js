// footer year
document.getElementById("year")?.appendChild(document.createTextNode(new Date().getFullYear()));

// color set for project tags
const hues = ["hue-1","hue-2","hue-3","hue-4","hue-5","hue-6"];

/* ---------- Typewriter on Home page ---------- */
(function typewriter(){
  const el = document.getElementById("type-rotator");
  if (!el) return;

  const words = [
    "Building Piplelines",
    "Machine Learning",
    "GenAI",
    "SQL",
    "Big Data",
    "Cloud on GCP & AWS",
    "FastAPI Services",
    "Analytics at Scale"
  ];

  const typeDelay = 80;      // ms per char while typing
  const backDelay = 50;      // ms per char while deleting
  const holdTime  = 1200;    // pause when a word finishes
  let i = 0, j = 0, typing = true;

  function tick(){
    const word = words[i % words.length];
    if (typing){
      j++;
      el.textContent = word.slice(0, j);
      if (j === word.length){
        typing = false;
        setTimeout(tick, holdTime);
        return;
      }
      setTimeout(tick, typeDelay);
    } else {
      j--;
      el.textContent = word.slice(0, j);
      if (j === 0){
        typing = true; i++;
      }
      setTimeout(tick, backDelay);
    }
  }
  tick();
})();

/* ---------- Projects page render ---------- */
fetch("/static/projects.json")
  .then(r => r.json())
  .then(items => {
    const wrap = document.getElementById("projects");
    if (!wrap) return;

    items.forEach((p, idx) => {
      const hue = hues[idx % hues.length];
      const el = document.createElement("article");
      el.className = `card ${hue}`;
      el.innerHTML = `
        <h3>${p.title}</h3>
        <p class="muted">${p.summary}</p>
        <div class="tags">
          ${(p.tags||[]).map((t,i)=>`<span class="pill ${hues[(idx+i)%hues.length]}">${t}</span>`).join("")}
        </div>
        <p class="link-row" style="margin-top:10px">
          ${(p.links||[]).map(l=>`<a href="${l.href}" target="_blank" rel="noreferrer">${l.label}</a>`).join(" · ")}
        </p>
      `;
      wrap.appendChild(el);
    });
  })
  .catch(()=>{});
