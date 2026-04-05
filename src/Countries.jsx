import { useEffect, useState } from 'react'

function Countries() {
  const [countries, setCountries] = useState([])
  const countriesPerPage = 5
  const [currentPage, setCurrentPage] = useState(1)

  const indexOfLastItem = currentPage * countriesPerPage
  const indexOfFirstItem = indexOfLastItem - countriesPerPage

  const currentCountries = countries.slice(indexOfFirstItem, indexOfLastItem)

  const [totalPageCount, setTotalPageCount] = useState(1)
  const [rangeWithDots, setRangeWithDots] = useState([])

  const getPagination = () => {
    const delta = 2 // Pages to show on each side of currentPage
    const range = []
    const r = []

    let l

    for (let i = 1; i <= totalPageCount; i++) {
      // Condition: Always show first, last, and pages within delta of currentPage
      if (
        i === 1 ||
        i === totalPageCount ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i)
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          r.push(l + 1) // Fill small gap of 1
        } else if (i - l !== 1) {
          r.push('...') // Fill larger gaps with ellipsis
        }
      }
      r.push(i)
      
      l = i
    }
    setRangeWithDots(r)
  }

  const handlePageChange = (page) => {
    if(page === '...') {
      return
    }
    setCurrentPage(page)
    getPagination()
  }

  useEffect(() => {
    const allURL = `https://restcountries.com/v3.1/all?fields=name,flags`
    fetch(allURL)
      .then((response) => response.json())
      .then((data) => {
        setCountries(data)
        setTotalPageCount(Math.ceil(countries.length / countriesPerPage))
        getPagination()
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
            <tr key={country.name.common} className='border-b hover:bg-gray-50'>
              <td className='px-6 py-3'>
                <img
                  className='w-full max-w-18.75 aspect-square rounded-md object-cover'
                  src={country.flags.svg}
                  alt='Flag'
                />
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
          <div>
            Page {currentPage} of {totalPageCount}
          </div>
        </div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={
            currentPage === Math.ceil(countries.length / countriesPerPage)
          }
          className='px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-700 disabled:opacity-50'
        >
          Next
        </button>
      </div>

      {/* Pagination group buttons */}
      <div className='mt-4 flex row'>
        {rangeWithDots.map((page) => {
          const className =
            page === 1
              ? 'rounded-md rounded-r-none bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
              : page === totalPageCount
                ? 'rounded-md rounded-l-none bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                : 'rounded-none bg-slate-800 py-2 px-4 border-l border-r border-slate-700 text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'

          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={className}
              type='button'
            >
              {page}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Countries
