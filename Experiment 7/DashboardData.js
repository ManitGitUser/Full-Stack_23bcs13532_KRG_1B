export function getRandomMetrics() {
    const cpu = Math.floor(Math.random() * 100);
    const gpu = Math.floor(Math.random() * 100);
    const ram = Math.floor(Math.random() * 16);
    const fps = Math.floor(Math.random() * (120 - 30 + 1)) + 30;
  
    return { cpu, gpu, ram, fps };
  }