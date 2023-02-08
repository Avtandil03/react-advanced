import { useState, useEffect } from "react"

export function useDebounce (value:string, delay = 300) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {

  }, [value, delay])
}