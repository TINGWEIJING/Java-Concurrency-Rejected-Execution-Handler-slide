import { crossfade, type CrossfadeParams } from 'svelte/transition'
import { quintOut } from 'svelte/easing'

export const [send, receive] = crossfade({
  duration: (d: number): number => Math.sqrt(d * 200),
  fallback(node: Element, params: CrossfadeParams) {
    const style = getComputedStyle(node)
    const transform = style.transform === 'none' ? '' : style.transform

    return {
      duration: 600,
      easing: quintOut,
      css: (t: number): string => `
        transform: ${transform} scale(${t});
        opacity: ${t}
      `
    }
  }
})
