import { useState } from "react"

export const useField = (name) => {
  const [field, setField] = useState('')

  const onChange = ({ target }) => setField(target.value)

  const reset = () => setField('')

  return {name, field, onChange, reset}
}