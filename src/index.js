import { useState, useEffect, useRef } from 'react'

const useResizeObserver = (option = 'contentRect') => {
  const ref = useRef(null)
  const [height, setHeight] = useState()
  const [width, setWidth] = useState()

  useEffect(() => {
    if (ref.current) {
      const observer = new ResizeObserver((entries) => {
        handleResize(entries)
      })
      observer.observe(ref.current)

      // Callback fired when component is unmounted
      return () => {
        observer.disconnect()
      }
    }
  })

  const handleResize = (entries) => {
    for (let entry of entries) {
      if (
        option === 'borderBoxSize' &&
        entry.borderBoxSize &&
        entry.borderBoxSize.length > 0
      ) {
        setHeight(entry.borderBoxSize[0].blockSize)
        setWidth(entry.borderBoxSize[0].inlineSize)
      } else if (
        option === 'contentBoxSize' &&
        entry.contentBoxSize &&
        entry.contentBoxSize.length > 0
      ) {
        setHeight(entry.contentBoxSize[0].blockSize)
        setWidth(entry.contentBoxSize[0].inlineSize)
      } else {
        setHeight(entry.contentRect.height)
        setWidth(entry.contentRect.width)
      }
    }
  }

  return [ref, width, height]
}

export default useResizeObserver
