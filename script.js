const ctx = document.getElementById('liveChart').getContext('2d');

let currentValue = 0;

const data = {
  labels: [new Date().toLocaleTimeString()],
  datasets: [{
    label: "Revenue",
    data: [currentValue],
    tension: 0.25,
    borderWidth: 2
  }]
};

const liveChart = new Chart(ctx, {
  type: "line",
  data: data,
  options: {
    animation: false,
    scales: { y: { beginAtZero: true } },
    plugins: { legend: { display: false } }
  }
});

function formatNumber(n){ return n.toLocaleString(); }

document.getElementById("revenueDisplay").textContent = formatNumber(currentValue);

setInterval(() => {
  currentValue += 1000;

  data.labels.push(new Date().toLocaleTimeString());
  data.datasets[0].data.push(currentValue);

  if (data.labels.length > 20) {
    data.labels.shift();
    data.datasets[0].data.shift();
  }

  document.getElementById("revenueDisplay").textContent = formatNumber(currentValue);
  liveChart.update();
}, 1000);
