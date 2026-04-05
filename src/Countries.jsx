import { useEffect, useState } from 'react'

function Countries() {
  const [countries, setCountries] = useState([])
  const itemsPerPage = 5
  const [currentPage, setCurrentPage] = useState(1)

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  const currentCountries = countries.slice(indexOfFirstItem, indexOfLastItem)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    const allURL = `https://restcountries.com/v3.1/all?fields=name,flags`
    fetch(allURL)
      .then((response) => response.json())
      .then((data) => {
        setCountries(data)
      })
      .catch(() => {})
  })

  return (
    <div className='max-w-4xl mx-auto my-8 p-4 shadow-lg rounded-lg bg-white'>
      <table className='table-auto w-full text-left border-collapse border border-gray-300'>
        <thead className='bg-blue-100'>
          <tr>
            <th className='px-6 py-3 font-medium text-gray-700'>Flag</th>
            <th className='px-6 py-3 font-medium text-gray-700'>Name</th>
          </tr>
        </thead>
        <tbody>
          {currentCountries.map((country) => (
            <tr key={country.id} className='border-b hover:bg-gray-50'>
              <td className='px-6 py-3'>
                <img className="w-full max-w-18.75 aspect-square rounded-md object-cover" src={country.flags.svg} alt='Flag' />
              </td>
              <td className='px-6 py-3'>{country.name.common}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className='mt-4 flex justify-between items-center'>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className='px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-700 disabled:opacity-50'
        >
          Previous
        </button>
        <div className='text-gray-700'>
          Page {currentPage} of {Math.ceil(countries.length / itemsPerPage)}
        </div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(countries.length / itemsPerPage)}
          className='px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-700 disabled:opacity-50'
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Countries
