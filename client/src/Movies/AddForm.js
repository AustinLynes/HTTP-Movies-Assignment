import React, { useState, useEffect } from 'react'
import axios from 'axios'
const initState = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: ''
}
const AddForm = (props) => {
    const { match, movies } = props
    console.log(movies)
    const [payload, setPayload] = useState(initState)

    const handleChange = e => {
        e.preventDefault()
        setPayload({ ...payload, [e.target.name]: e.target.value })
    }
    const handleSubmit = e => {
        e.preventDefault()
        // const stars =
        // console.log(payload.stars)
        const values = {
            id: payload.id,
            title: payload.title,
            director: payload.director,
            metascore: payload.metascore,
            stars: convert(payload.stars)
        }
        axios
            .post(`http://localhost:5000/api/movies`, values)
            .then(res => { props.updateMovies(res.data)})
            .catch(err => console.log('err:', err))

        console.log(props.movies)
        props.history.push('/')
    }
    const convert = (str) => {
     // if its a string convert to array 
            return str.split(',')
    }

    // console.log(convert('tom, jerry, goku, vageta'))
    return (
        <form
            onSubmit={handleSubmit}
            className='update-form'>
            <input
                name='id'
                onChange={handleChange}
                value={payload.id}
            />
            <input
                name='title'
                onChange={handleChange}
                value={payload.title}
            />
            <input
                name='director'
                onChange={handleChange}
                value={payload.director}
            />
            <input
                name='metascore'
                onChange={handleChange}
                value={payload.metascore}
            />
            <textarea
                onChange={handleChange}
                name='stars'
                value={payload.stars}
            />
            <button>Finish</button>
        </form>
    )
}

export default AddForm