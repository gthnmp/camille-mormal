export default function resizeCanvas(canvas: HTMLCanvasElement){
  const displayHeight = canvas.clientHeight
  const displayWidth = canvas.clientWidth

  const needResize = canvas.width !== displayWidth || canvas.height !== displayHeight
  if(needResize){
    canvas.width = displayWidth
    canvas.height = displayHeight
  }
  return needResize
}