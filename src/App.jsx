import React, { useEffect, useState } from 'react'
import FileSaver from 'file-saver'

function App() {
  const [file, setFile] = useState("")
  const [user, setuser] = useState([])



  useEffect(() => {
    fetch("http://localhost:8000/getexcel")
      .then(res => res.json())
      .then(json => setuser(json.user))
  }, [user])


  const handleexport = () => {

    fetch("http://localhost:8000/exportexcel")
      .then(res => res.blob())
       .then(blob => FileSaver(blob,"salarysheet"))
  }



  const handleupload = () => {
    const fromdata = new FormData()
    fromdata.append("file", file)


    fetch("http://localhost:8000/excel", {
      method: "POST",
      body: fromdata
    }).then((res) => res.json())
      .then((json) => alert(json.mess))

  }

  return (
    <>
      <div className='csv'>
        <p>UPLOAD ONLY EXCEL FILE</p>
        <div className='csvflex'>
          <input type='file' className='' required accept='.xlsx' onChange={(e) => setFile(e.target.files[0])} />
          <button type="button" className="btn btn-primary" onClick={handleupload}>upload</button>

        </div>
        <button type="button" className="btn btn-primary" onClick={handleexport}>Export</button>

        <div className='csvsc'>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Address</th>
                <th scope="col">PhoneNo</th>
                <th scope="col">Salary</th>
              </tr>
            </thead>
            <tbody>
              {
                user && user.map((e, ind) => {
                  return (
                    <tr key={ind}>
                      <td>{e.Name}</td>
                      <td>{e.Address}</td>
                      <td>{e.PhoneNumber}</td>
                      <td>{e.Salary}</td>
                    </tr>
                  )
                })
              }

            </tbody>
          </table>
        </div>
      </div>

    </>
  )
}

export default App
