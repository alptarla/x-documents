import { useEffect, useState } from 'react'

function useClickOutside(ref, onOutside) {
  const [isOutside, setIsOutside] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      if (!ref?.current?.contains(e.target)) {
        setIsOutside(true)
        onOutside()
      }
    }
    window.document.addEventListener('click', handler, true)

    return () => {
      return window.document.removeEventListener('click', handler, true)
    }
  }, [ref, onOutside])

  return isOutside
}

export default useClickOutside
