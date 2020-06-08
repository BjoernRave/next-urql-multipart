import { useState } from 'react'
import { withUrqlClient } from 'next-urql'
import { useMutation } from 'urql'
import gql from 'graphql-tag'
import { multipartFetchExchange } from '@urql/exchange-multipart-fetch'

const UPLOAD_FILE = gql`
  mutation UPLOAD_FILE($file: Upload!) {
    singleUpload(file: $file) {
      filename
    }
  }
`

const Home = () => {
  const [file, setFile] = useState(null)
  const [, uploadFile] = useMutation(UPLOAD_FILE)

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(file)

    await uploadFile({ file })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='file' onChange={(e) => setFile(e.target.files[0])} />
        <button>Upload</button>
      </form>
    </div>
  )
}

export default withUrqlClient({
  url: 'http://localhost:3000/api/graphql',
  exchanges: [multipartFetchExchange],
})(Home)
