import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client/react'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const Authors = ({ show, token }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const authors = useQuery(ALL_AUTHORS)

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })


  if (authors.loading) {
    return <div>loading...</div>
  }
  if (!show) {
    return null
  }

  const selectedName = name || authors.data?.allAuthors[0]?.name

  const submit = async (event) => {
    event.preventDefault()

    try {
      await editAuthor({
        variables: {
          name: selectedName,
          setBornTo: Number(born)
        },
      })

    setBorn('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {token && (
        <>
          <h3>Set birthyear</h3>
          <form onSubmit={submit}>
            name
            <select
              name="name"
              value={selectedName || ''}
              onChange={({ target }) => setName(target.value)}
            >
              {authors.data.allAuthors.map((author) => (
                <option key={author.id} value={author.name}>
                  {author.name}
                </option>
              ))}
            </select>

            <div>
              <label>
                born
                <input
                  value={born}
                  onChange={({ target }) => setBorn(target.value)}
                />
              </label>
            </div>

            <button type="submit">update author</button>
          </form>
        </>
      )}
    </div>
  )
}

export default Authors
