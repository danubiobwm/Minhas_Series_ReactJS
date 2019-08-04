import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Badge } from 'reactstrap';
import { Button } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';

const InfoSerie = ({ match }) => {

    const [form, setForm] = useState({
        name:''
    });
    const [success, setSuccess] = useState(false);
    const [mode, setMode] = useState('INFO');
    const [genres, setGenres] = useState([]);
    const [genreId, setGenreId] = useState('')


    const [data, setData] = useState({})
    useEffect(() => {
        axios
            .get('/api/series/' + match.params.id)
            .then(res => {
                setData(res.data)
                setForm(res.data)
            })
    }, [match.params.id])

    useEffect(() => {
        axios
            .get('/api/genres')
            .then(res => {
                setGenres(res.data.data)
                const genres=res.data.data
                const encontrado =genres.find(value => data.genre === value.name)
                if(encontrado){
                    setGenreId(encontrado.id)
                }
            })
    }, [data])

    // Custom Header
    const masterHeader = {
        height: '50vh',
        minHeight: '500px',
        backgroundImage: `url('${data.background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    }

    const onChangeGenre = evt =>{
      setGenreId(evt.target.value);
    }


    const onChange = field => evt => {
        setForm({
            ...form,
            [field]: evt.target.value
        });
    }

    const seleciona = value => () => {
        setForm({
            ...form, 
            status:value
        })
    }


    const save = () => {
        axios
            .put('/api/series/' + match.params.id, {
                ...form, 
                genre_id: genreId
            })
            .then(res => {
                setSuccess(true);
            })
    }
    if (success) {
        return <Redirect to='/series/' />
    }




    return (

        <div>
            <header style={masterHeader}>
                <div className='h-100' style={{ background: 'rgba(0,0,0,0.5)' }}>
                    <div className='container'>
                        <div className='row h-100 align-items-center'>
                            <div className='col-3'>
                                <img alt={data.name} className='img-fluid img-thumbnail' src={data.poster} />
                            </div>
                            <div className='col-8'>
                                <h1 className='font-weight-light text-white'>{data.name}</h1>

                                <div className='lead text-write'>
                                   { data.status === 'ASSISTIDO' && <Badge color='success'>Assistido</Badge>}
                                    { data.status === 'PARA_ASSISTIR' &&  <Badge color='warning'>Para assistir</Badge>}
                                    Gênero: {data.genre}
                                </div>

                            </div>

                        </div>
                    </div>

                </div>
            </header>
            <div>
                <Button outline color="secondary" onClick={() => setMode('EDIT')}>Editar</Button>
            </div>

            {
                mode === 'EDIT' &&

                <div className='container'>
                    <h1> Informação da Série</h1>
                    
                    <Button outline color="danger" onClick={() => setMode('INFO')}>Cancelar</Button>
                    <Form>
                        <div className='form-group'>
                            <label htmlFor='name'>Nome</label>
                            <input type='text' value={form.name} onChange={onChange('name')} className='form-control' id='name' placeholder='Nome da Série' />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='name'>Cometários</label>
                            <input type='text' value={form.comments} onChange={onChange('comments')} className='form-control' id='name' placeholder='Deixe seu Cometário' />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='name'>Genêro</label>
                            <select className='form-control' onChange={onChangeGenre} value={genreId}>
                                <option value="">Selecionar</option>
                                {genres.map(genre => <option key={genre.id} value={genre.id} >{genre.name}</option>)}

                            </select>
                            <br />
                        </div>
                        <div className='form-check' >
                        <Form>
                            <FormGroup check inline>
                                <Label check htmlFor='assistido'>
                                    <Input type="checkbox" id='assistido' value='ASSISTIDO' defaultChecked={form.status ==='ASSISTIDO'} onChange={seleciona('ASSISTIDO')} /> Assistido
                                </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check htmlFor='paraAssistir'>
                                    <Input type="checkbox" id='paraAssistir' value='PARA_ASSISTIR' defaultChecked={form.status ==='PARA_ASSISTIR'} onChange={seleciona('PARA_ASSISTIR')} /> Para assistir
                                </Label>
                            </FormGroup>
                        </Form>
                        </div>  
                        <button type='button' onClick={save} className='btn btn-primary'>Salvar</button>
                    </Form>
                </div>
            }
        </div>
    )
}

export default InfoSerie


