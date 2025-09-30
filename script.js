const totalAmount = 46667;
let collectedAmount = 0;

const ctx = document.getElementById("progressChart").getContext("2d");
let progressChart = new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: ["已收集", "剩餘"],
    datasets: [
      {
        data: [0, totalAmount],
        backgroundColor: ["#4caf50", "#e0e0e0"],
        borderWidth: 1
      }
    ]
  },
  options: {
    plugins: {
      legend: {
        position: "bottom"
      }
    }
  }
});

function updateProgress() {
  const input = document.getElementById("amountInput").value;
  if (!input || input < 0) return;

  collectedAmount = Math.min(totalAmount, input);
  const remaining = totalAmount - collectedAmount;
  const percent = ((collectedAmount / totalAmount) * 100).toFixed(2);

  // 顏色切換
  let color = "#4caf50";
  if (percent < 50) color = "#ef4444";
  else if (percent < 80) color = "#f59e0b";

  progressChart.data.datasets[0].data = [collectedAmount, remaining];
  progressChart.data.datasets[0].backgroundColor = [color, "#e0e0e0"];
  progressChart.update();

  document.getElementById("progressText").innerText =
    `目前進度：${percent}%（已收集 ${collectedAmount} 元 / 目標 ${totalAmount} 元）`;
}
