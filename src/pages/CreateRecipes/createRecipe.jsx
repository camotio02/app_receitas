import { Fragment, useContext } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
const authorId = 'nfgTOWtnXyNeXbAZ6sWFmgDC7bk1'
import {
    KeyboardArrowUp as KeyboardArrowUpIcon,
    ArrowDropDown as ArrowDropDownIcon,
} from '@mui/icons-material'

import './index.css'
import { RecipeForm } from './RecipeForm'
import { Fab, Fade } from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react'
import { api } from '../../api'
import { AuthContext } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { INTERFACE } from '../INTERFACE/index.jsx'


export const CreateRecipes = ({ }) => {
    const { user } = useContext(AuthContext)
    const [scrollHeight, setScrollHeight] = useState(0)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        recipeTitle: '',
        recipeDescription: '',
        ingredients: [],
        modPreps: [],
        prepTime: '',
        cookTime: '',
        servingSize: '',
        recipeCategory: '',
        recipeDifficulty: '',
        recipeImage: null,
        cookingTips: '',
        calories: '',
        carbs: '',
        protein: '',
        fat: '',
        sod: '',
        gord: '',
        author: '',
        ranking: '',
        creationDate: '',
        name: '',
        email: '',
        country: '',
    })
    const handleInputIngre = (e, index) => {
        const novosValores = [...formData.ingredients] // Corrigido para "ingredients"
        novosValores[index] = e.target.value
        setFormData({ ...formData, ingredients: novosValores }) // Corrigido para "ingredients"
    }

    const adicionarIngre = () => {
        setFormData({ ...formData, ingredients: [...formData.ingredients, ''] }) // Corrigido para "ingredients"
    }

    const removerIngre = (index) => {
        const novosValores = [...formData.ingredients] // Corrigido para "ingredients"
        novosValores.splice(index, 1)
        setFormData({ ...formData, ingredients: novosValores }) // Corrigido para "ingredients"
    }

    const handleInputModPreps = (e, index) => {
        const novosValores = [...formData.modPreps] // Corrigido para "modPreps"
        novosValores[index] = e.target.value
        setFormData({ ...formData, modPreps: novosValores }) // Corrigido para "modPreps"
    }

    const adicionarModPreps = () => {
        setFormData({ ...formData, modPreps: [...formData.modPreps, ''] }) // Corrigido para "modPreps"
    }

    const removerModPreps = (index) => {
        const novosValores = [...formData.modPreps] // Corrigido para "modPreps"
        novosValores.splice(index, 1)
        setFormData({ ...formData, modPreps: novosValores }) // Corrigido para "modPreps"
    }
    const handleInputChangesCreateRecipes = (event) => {
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0]
        const reader = new FileReader()
        reader.onload = () => {
            const base64Image = reader.result;
            setFormData({ ...formData, recipeImage: base64Image });
        };
        reader.readAsDataURL(file);
    };
    const handleSubmit = async (event) => {
        const userId = user?.uid;
        if (userId) {
            const payload = { ...formData, author: user.uid, email: user.email }
            await api.recipe
                .post(payload)
                .then((response) => {
                    console.log(response)
                    alert('success')
                    setFormData('')
                })
        }
        navigate("/myRecipes")
    };


    useEffect(() => {
        const handleScroll = () => {
            const height = window.scrollY || 0
            setScrollHeight(height)
        }
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', handleScroll)

            // Limpe o evento de scroll quando o componente for desmontado
            return () => {
                window.removeEventListener('scroll', handleScroll)
            }
        }
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }
    return (
        <>
            <INTERFACE RENDERPAGE={<>
                <Container
                    component="main"
                    maxWidth="sm"
                    sx={{
                        mb: 4,
                        mt: 15,
                        display: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Paper
                        variant="outlined"
                        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
                    >
                        <Fragment>
                            <RecipeForm
                                formData={formData}
                                setFormData={setFormData}
                                handleInputChangesCreateRecipes={
                                    handleInputChangesCreateRecipes
                                }
                                handleImageChange={handleImageChange}
                                handleSubmit={handleSubmit}
                                handleInputIngre={handleInputIngre}
                                adicionarIngre={adicionarIngre}
                                removerIngre={removerIngre}
                                handleInputModPreps={handleInputModPreps}
                                adicionarModPreps={adicionarModPreps}
                                removerModPreps={removerModPreps}
                            />
                        </Fragment>
                    </Paper>
                </Container>

            </>} />

        </>
    )
}
