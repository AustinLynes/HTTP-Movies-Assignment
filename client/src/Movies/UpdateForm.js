import React, { useState, useEffect } from 'react'
import axios from 'axios'
const initState = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: ''
}
const UpdateForm = (props) => {
    const { match, movies } = props
    console.log(movies)
    const [payload, setPayload] = useState(initState)
    // console.log('props::', props)

    useEffect(() => {
        console.log('running')
        const _id = match.params.id
        
        const movieToUpdate = movies.find(movie => {
            // console.log(`${movie.id}`, _id);
            return `${movie.id}` === _id;
        });
        // console.log('toUpdate ::', movieToUpdate)
        if (movieToUpdate)
            setPayload(movieToUpdate)
    }, [match, movies])

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
            .put(`http://localhost:5000/api/movies/${payload.id}`, values)
            .then(res => { props.updateMovies([...movies, res.data]) })
            .catch(err => console.log(err))

        console.log(props.movies)
        props.history.push('/')
    }
    const convert = (str) => {
        console.log('length:',str.length)
        if (str.length > 1 && !Array.isArray(str) ) // if its a string convert to array 
            return str.split(',')
        else
            return str //Return it as the array it is
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

export default UpdateForm