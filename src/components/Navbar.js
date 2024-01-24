import React, { useState } from 'react'
import './Navbar.css'
import './Content.css'
import './article.css'
import { Formik, Form, Field }from 'formik'

const Navbar = () => { 
  const [ photos, setPhotos ] = useState([])
  const open = (url) => window.open(url)
  
  return(
    <div>
      <header className='header1'>
        <Formik
          initialValues={{ search: '' }}
          onSubmit= { async values => {
            const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,
              {
                headers: { 
                  'Authorization': 'Client-ID vGj0Ajmw-yf-2esp6cKS9pFfYN2wq5cPJ-ewit6SM1U'
                }
              }
            )
            const data = await response.json()
            setPhotos(data.results)
          }}
        >
          <Form>
            <Field name='search' placeholder='que deseas buscar?' />
          </Form>
        </Formik>
      </header>
      <div className='container'>
        <div className='center'>
          { photos.map( photo =>
            <article key={photo.id} onClick={() => open(photo.links.html)}>
              <img src={photo.urls.regular}/>
              <p>{[photo.alt_description, photo.description].join(' - ')}</p>
            </article>
          )}
        </div>
      </div>
    </div>

  )
}

export default Navbar