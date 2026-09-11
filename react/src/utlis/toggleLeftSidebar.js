export default function toggleLeftSidebar() {
  const layOutWrapper = document.querySelector(".layout-wrap");
  if (layOutWrapper) {
    if (layOutWrapper.classList.contains("full-width")) {
      layOutWrapper.classList.remove("full-width");
    } else {
      layOutWrapper.classList.add("full-width");
    }
  }
}
