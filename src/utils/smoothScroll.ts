
let target = 0;
let current = 0;
const ease = 0.1;
let mousePosition = 0;

let isDragging = false;
let startY = 0;

function lerp(start: number, end: number, t: number) {
  return start * (1 - t) + end * t;
}

const initSmoothScroll = (gap:number) => {
  const minimumX = 0;
  const maximumX = gap * 7;
  
  function smoothScroll() {
    current = lerp(current, target, ease);
    current = parseFloat(current.toFixed(5));
    mousePosition = current;
    requestAnimationFrame(smoothScroll);
  }
  
  function handleWheel(e: WheelEvent) {
    e.preventDefault();
    target = Math.max(minimumX, Math.min(target + e.deltaY / 1000, maximumX));
  }
  
  function handleMouseDown(event: MouseEvent) {
    isDragging = true;
    startY = event.clientX;
  }
  
  function handleMouseMove(event: MouseEvent) {
    if (!isDragging) return;
    const deltaY = event.clientX - startY;
    target = Math.min(maximumX, Math.max(0, target - (deltaY / 250)));
    startY = event.clientX;
  }
  
  function handleMouseUp() {
    isDragging = false;
  }
  smoothScroll();
  window.addEventListener('wheel', handleWheel, { passive: false });
  window.addEventListener('mousedown', handleMouseDown);
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseup', handleMouseUp);
}

export {
  initSmoothScroll,
  lerp,
  mousePosition,
};
