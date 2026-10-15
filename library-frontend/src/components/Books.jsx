import { useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const books = useQuery(ALL_BOOKS, { variables: { genre } })
  const genres = useQuery(ALL_BOOKS)

  if (books.loading || genres.loading) {
    return <div>loading...</div>
  }
  if (!props.show) {
    return null
  }
  const allGenres = [...new Set(genres.data.allBooks.flatMap((book) => book.genres))]

  return (
    <div>
      <h2>books</h2>
      {genre && (<p>In genre <strong>{genre}</strong></p>)}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {allGenres.map((g) => (
          <button key={g} onClick={() => setGenre(g)}>
            {g}
          </button>
        ))}
        <button onClick={() => setGenre(null)}>
          all genres
        </button>
      </div>
    </div>
  )
}

export default Books
