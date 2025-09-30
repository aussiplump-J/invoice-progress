const totalAmount = 46667;

// 嘗試從 localStorage 讀取之前的金額
let collectedAmount = parseFloat(localStorage.getItem("collectedAmount")) || 0;

// 更新顯示
updateChart(collectedAmount);

const ctx = document.getElementById("progressChart").getContext("2d");
let progressChart = new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: ["已收集", "剩餘"],
    datasets: [
      {
        data: [collectedAmount, totalAmount - collectedAmount],
        backgroundColor: [getColor(collectedAmount), "#e0e0e0"],
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
  const input = parseFloat(document.getElementById("amountInput").value);
  if (!input || input < 0) return;

  collectedAmount += input; // 累加金額
  if (collectedAmount > totalAmount) collectedAmount = totalAmount;

  // 存入 localStorage
  localStorage.setItem("collectedAmount", collectedAmount);

  updateChart(collectedAmount);

  // 清空輸入框
  document.getElementById("amountInput").value = "";
}

function updateChart(amount) {
  const remaining = totalAmount - amount;
  const percent = ((amount / totalAmount) * 100).toFixed(2);

  progressChart.data.datasets[0].data = [amount, remaining];
  progressChart.data.datasets[0].backgroundColor = [getColor(amount), "#e0e0e0"];
  progressChart.update();

  document.getElementById("progressText").innerText =
    `目前進度：${percent}%（已收集 ${amount} 元 / 目標 ${totalAmount} 元）`;
}

// 根據百分比選顏色
function getColor(amount) {
  const percent = (amount / totalAmount) * 100;
  if (percent < 50) return "#ef4444"; // 紅
  else if (percent < 80) return "#f59e0b"; // 黃
  else return "#4caf50"; // 綠
}
