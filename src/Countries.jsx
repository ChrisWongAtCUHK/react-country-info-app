import { useEffect } from 'react'

function Countries() {
  useEffect(() => {
    const allURL = `https://restcountries.com/v3.1/all?fields=name,flags`
    fetch(allURL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
      })
      .catch(() => {})
  })

  return (
    <h1 className='text-3xl font-bold underline text-blue-600'>Hello world!</h1>
  )
}

export default Countries
