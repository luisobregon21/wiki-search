import React, { useState } from 'react'

function App() {
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])
    const [searchInfo, setSearchInfo] = useState({})

    const handleSearch = async (e) => {
        e.preventDefault()
        if (search === '') return

        const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&
        prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${search}`

        const response = await fetch(endpoint)
        // console.log(response)

        if (!response.ok) {
            throw Error(response.statusText)
        }

        const json = await response.json()
        // console.log(json)

        setResults(json.query.search)
        setSearchInfo(json.query.searchinfo)
    }
    return (
        <div className="App">
            <header>
                <h1> Wiki Master Finder </h1>
                <form className="search-box" onSubmit={handleSearch}>
                    <input
                        type="search"
                        placeholder="Find what you want..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    ></input>
                </form>
                {searchInfo.totalhits ? (
                    <p>Search Results: {searchInfo.totalhits}</p>
                ) : (
                    ''
                )}
            </header>
            <div className="results">
                {results.map((result, idx) => {
                    const url = `https://en.wikipedia.org/?curid=${result.pageid}`
                    return (
                        <div className="result" key={idx}>
                            <h3>{result.title}</h3>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: result.snippet,
                                }}
                            ></p>
                            <a href={url} target="_blank" rel="noreferrer">
                                Read More
                            </a>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default App
