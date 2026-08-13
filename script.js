const modelButtons = [...document.querySelectorAll(".model-option")];
const revealButton = document.querySelector("#reveal");
const results = document.querySelector("#results");
const modelInputPanel = document.querySelector(".model-input-panel");
const contextPreviews = [...document.querySelectorAll("[data-preview]")];
const selectedModelName = document.querySelector("#selected-model-name");
const closestBadge = document.querySelector("#closest-badge");
const predictionValue = document.querySelector("#prediction-value");
const predictionDelta = document.querySelector("#prediction-delta");

const modelDetails = {
  full: { name: "Baseline + question text + question images", prediction: "77%", delta: "1 percentage point from actual" },
  text: { name: "Baseline + question text", prediction: "75%", delta: "3 percentage points from actual" },
  image: { name: "Baseline + question images", prediction: "73%", delta: "5 percentage points from actual" },
  base: { name: "Baseline", prediction: "72%", delta: "6 percentage points from actual" },
};

let selectedModel = "base";

function selectModel(button) {
  selectedModel = button.dataset.model;
  const details = modelDetails[selectedModel];
  modelInputPanel.dataset.model = selectedModel;
  selectedModelName.textContent = details.name;
  predictionValue.textContent = details.prediction;
  predictionDelta.textContent = details.delta;
  closestBadge.hidden = selectedModel !== "full";
  contextPreviews.forEach((preview) => {
    preview.hidden = preview.dataset.preview !== selectedModel;
  });
  modelButtons.forEach((item) => {
    const selected = item === button;
    item.classList.toggle("selected", selected);
    item.setAttribute("aria-selected", String(selected));
  });
}

modelButtons.forEach((button) => button.addEventListener("click", () => selectModel(button)));

revealButton.addEventListener("click", () => {
  const opening = results.hidden;
  results.hidden = !opening;
  revealButton.textContent = opening ? "Collapse" : "See How the Models Compare";

  if (opening) {
    selectModel(modelButtons.find((button) => button.dataset.model === selectedModel));
    results.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});
