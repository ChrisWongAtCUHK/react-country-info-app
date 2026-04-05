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
    <div className='App'>
      <h1>TODO: list all countries</h1>
    </div>
  )
}

export default Countries
