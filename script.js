// 打字机效果
const toggle = document.getElementById("themeToggle");
const body = document.body;
const current = localStorage.getItem("theme");

if (current === "light") {
    body.classList.add("light-mode");
    toggle.textContent = "☀️";
}

toggle.onclick = () => {
    body.classList.toggle("light-mode");
    const isLight = body.classList.contains("light-mode");
    toggle.textContent = isLight ? "☀️" : "🌙";
    localStorage.setItem("theme", isLight ? "light" : "dark");
};


// 锚点回到顶部
document.addEventListener("DOMContentLoaded", function () {
    const backToTop = document.getElementById("backToTop");

    // 监听滚动，控制按钮显示/隐藏
    window.addEventListener("scroll", function () {
        if (window.scrollY > 200) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    });

    // 点击回到顶部
    backToTop.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});



// 页面加载动画
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    if (!sessionStorage.getItem("pageLoadedOnce")) {
        setTimeout(() => {
            loader.style.display = "none";
            sessionStorage.setItem("pageLoadedOnce", "true");
        }, 1000); // 第一次加载延迟隐藏
    } else {
        loader.style.display = "none"; // 之后快速跳过
    }
});



// 密码提示验证
// 获取当前时间组成动态密码
function getCurrentPassword() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    return `${year}${month}${day}${hour}`; // 例：2025062419
}

// 元素绑定
const modal = document.getElementById("passwordModal");
const openBtn = document.getElementById("openModalBtn");
const closeBtn = document.getElementById("closeModal");
const submitBtn = document.getElementById("submitPassword");
const input = document.getElementById("passwordInput");
const error = document.getElementById("errorMessage");
const help = document.getElementById("downloadHelp");

// 打开弹窗
openBtn.onclick = () => {
    modal.style.display = "block";
    error.style.display = "none";
    help.style.display = "none";
    input.value = "";
};

// 关闭弹窗
closeBtn.onclick = () => {
    modal.style.display = "none";
};

// 提交验证
submitBtn.onclick = () => {
    const entered = input.value.trim();
    const expected = getCurrentPassword();

    if (entered === expected) {
        modal.style.display = "none";

        // 自动下载 resume.pdf
        const link = document.createElement('a');
        link.href = 'resume.pdf';  // 👈 替换为你的实际简历路径
        link.download = 'resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // 显示备用手动下载提示
        help.style.display = "block";
    } else {
        error.style.display = "block";
    }
};

// 访问量统计
 function fetchWithTimeout(resource, options = {}) {
  const { timeout = 3000 } = options;

  return Promise.race([
    fetch(resource),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout")), timeout)
    ),
  ]);
}

fetchWithTimeout("https://vister-counter.romantically0312.workers.dev/", { timeout: 3000 })
  .then(res => res.json())
  .then(data => {
    document.getElementById("visits").textContent = data.visits;
  })
  .catch(err => {
    console.error("访问统计失败：", err);
    document.getElementById("visits").textContent = "N/A";
  });
