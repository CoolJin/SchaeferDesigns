import { useEffect, useRef } from 'react'

export default function NoiseCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const c = ref.current!
    const ctx = c.getContext('2d')!
    let raf: number

    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight }
    const render = () => {
      const img = ctx.createImageData(c.width, c.height)
      const d = img.data
      for (let i = 0; i < d.length; i += 4) {
        const v = Math.random() * 255
        d[i] = d[i + 1] = d[i + 2] = v; d[i + 3] = 255
      }
      ctx.putImageData(img, 0, 0)
      raf = setTimeout(() => requestAnimationFrame(render), 80) as unknown as number
    }

    resize()
    render()
    window.addEventListener('resize', resize)
    return () => { clearTimeout(raf); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas id="noise-canvas" ref={ref} />
}
