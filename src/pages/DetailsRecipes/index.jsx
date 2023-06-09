import {
    Alert,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Checkbox,
    FormControlLabel,
    FormGroup,
    LinearProgress,
    Link,
    Stack,
    Tooltip,
    Typography,
    useMediaQuery,
} from '@mui/material'

import { useParams } from 'react-router-dom'

import {
    ArrowBack as ArrowBackIcon,
    AvTimer as AvTimerIcon,
    ElectricBolt as ElectricBoltIcon,
    PersonAddAlt1 as PersonAddAlt1Icon,
    Add as AddIcon,
    PieChartOutline as PieChartOutlineIcon,
    DataSaverOff as DataSaverOffIcon,
} from '@mui/icons-material'

import * as Tag from './index.js'
import { green, grey, orange } from '@mui/material/colors'
import { useEffect, useState } from 'react'
import { api } from '../../api/index.js'
import { INTERFACE } from '../INTERFACE/index.jsx'
// import { CardCover } from '@mui/material'

export const DetailsRecipes = () => {
    const { id } = useParams()
    const [recipe, setrecipe] = useState(null)
    const [ingredientes, setingredientes] = useState([])
    const [modopreparos, setmodopreparos] = useState([])
    const matches = useMediaQuery('(min-width:800px)')
    const [progress, setProgress] = useState(false)

    var Title = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '8rem',
        width: 'auto',
        color: orange[900],
        fontWeight: '900',
        margin: '2rem 0 1rem 0',
    }
    const [checkedItems, setCheckedItems] = useState(Array(5).fill(false))
    useEffect(() => {
        const obterDetalhesrecipe = async () => {
            const doc = await api.recipe.get(id)
            const docIngredientes = await api.ingredientes.get(id)
            const getModosPre = await api.modopreparo.get(id)
            if (doc) {
                setrecipe(doc)
                docIngredientes.map((i) => {
                    return setingredientes(i?.description)
                })
                getModosPre.map((i) => {
                    return setmodopreparos(i?.description || i?.descripion)
                })
            }
        }

        obterDetalhesrecipe()
    }, [id])

    const handleChange = (index) => {
        const newCheckedItems = [...checkedItems]
        newCheckedItems[index] = !newCheckedItems[index]
        setCheckedItems(newCheckedItems)
    }
    if (!recipe) {
        return (
            <>
                <Tag.Container>
                    <Stack
                        sx={{
                            width: '100%',
                            bgcolor: 'green',
                            position: 'fixed',
                            top: 0,
                            left: 0,
                        }}
                    >
                        <LinearProgress
                            sx={{ height: '0.5rem' }}
                            variant="indeterminate"
                        />
                    </Stack>
                    <Alert severity="info">
                        Carregando informações, por favor aguade...
                    </Alert>
                </Tag.Container>
            </>
        )
    }

    return (
        <>
            <INTERFACE RENDERPAGE={
                <>
                    <Tag.Container
                        sx={{
                            gap: '3rem',
                        }}
                    >
                        <Card
                            sx={
                                matches
                                    ? {
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexDirection: 'column',
                                        width: '100%',
                                        boxShadow:
                                            'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',

                                        padding: '0 0 10rem 0',
                                    }
                                    : {
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexDirection: 'column',
                                    }
                            }
                        >
                            <Tag.Midias
                                component="img"
                                alt="green iguana"
                                height="140"
                                image={recipe?.recipeImage}
                            />

                            <Stack
                                sx={{
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    justifyContent: 'center',
                                    mt: '-1.5rem',
                                    height: '3rem',
                                    width: '100%',
                                    padding: '0 1.4rem 0 0',
                                }}
                            >
                                <Button
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '100%',
                                        bgcolor: orange[900],
                                    }}
                                    variant={'contained'}
                                    startIcon={<AddIcon />}
                                >
                                    Seguir o user
                                </Button>
                            </Stack>

                            <Stack sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                width: '100%',
                            }} >
                                <Typography gutterBottom variant="h5" component="div">
                                    {recipe?.recipeTitle}
                                </Typography>

                                <Stack sx={{
                                    width: '90%',
                                }} gutterBottom variant="body2" color="text.secondary">
                                    {recipe?.recipeDescription}
                                </Stack>
                            </Stack>

                            <Typography sx={Title} variant="body1">
                                IMPORTANTES SOBRE A RECEITA
                            </Typography>

                            <CardActions
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    paddingTop: 2,
                                    gap: '2rem',
                                    width: '95%',
                                }}
                            >
                                {[
                                    {
                                        title: recipe?.cookTime,
                                        desc: 'Preparo',
                                        icon: <AvTimerIcon />,
                                    },
                                    {
                                        title: recipe?.calories,
                                        desc: 'Rendimento',
                                        icon: <PieChartOutlineIcon />,
                                    },
                                    {
                                        title: recipe?.servingSize,
                                        desc: 'Gra. por Porção',
                                        icon: <DataSaverOffIcon />,
                                    },
                                ].map((item) => {
                                    return (
                                        <>
                                            <Stack
                                                sx={{
                                                    border: `1px solid ${orange[900]}`,
                                                    color: orange[700],
                                                    width: '100%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexDirection: 'row',
                                                    fontSize: '100%',
                                                    borderRadius: '10px',
                                                    gap: '1rem',
                                                }}
                                            >
                                                {item.icon}
                                                <Stack>
                                                    <Typography variant="body1">
                                                        {item.desc}
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {item.title}
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                        </>
                                    )
                                })}
                            </CardActions>

                            <Typography sx={Title} padding={1}>
                                Informações Nutricionais de {recipe?.recipeTitle}
                            </Typography>
                            <Tag.NutInfo>
                                {[
                                    {
                                        name: 'Calorias',
                                        val: `${recipe?.calories} kcal`,
                                    },
                                    {
                                        name: 'Proteínas',
                                        val: `${recipe?.protein} g`,
                                    },
                                    {
                                        name: 'Gorduras Totais',
                                        val: `${recipe?.gord} g`,
                                    },
                                    {
                                        name: 'Gord. Saturadas',
                                        val: `${(10 / 100) * recipe?.gord} g`,
                                    },
                                    {
                                        name: 'Gord. Trans',
                                        val: `${(recipe?.servingSize / 100) * recipe?.gord} g`,
                                    },
                                    {
                                        name: 'Carboidratos',
                                        val: `${recipe?.carbs} g`,
                                    },
                                    {
                                        name: 'Fibras',
                                        val: `${recipe?.fat} g`,
                                    },
                                    {
                                        name: 'Sódio',
                                        val: `${recipe?.sod} mg`,
                                    },
                                ].map((nut) => {
                                    return (
                                        <Tag.Info
                                            sx={
                                                matches && {
                                                    width: '20%',
                                                    height: '5rem',
                                                }
                                            }
                                        >
                                            <Typography
                                                sx={{
                                                    color: grey[600],
                                                    fontSize: '14px',
                                                }}
                                                variant="p"
                                            >
                                                {nut?.name}
                                            </Typography>
                                            <Typography variant="body3">
                                                {nut?.val}
                                            </Typography>
                                        </Tag.Info>
                                    )
                                })}
                            </Tag.NutInfo>

                            <Typography sx={Title} padding={1}>
                                INGREDIENTES DESTA RECEITA
                            </Typography>
                            <Stack
                                sx={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    justifyContent: 'center',
                                    textAlign: 'left',
                                    width: '90%',
                                    bgcolor: '',
                                }}
                            >
                                <>
                                    {recipe?.ingredients
                                        .length > 0 &&
                                        recipe?.ingredients
                                            .map((ingredient, index) => {
                                                return (
                                                    <FormControlLabel
                                                        key={index}
                                                        sx={
                                                            checkedItems[index]
                                                                ? {
                                                                    textDecoration:
                                                                        'line-through',
                                                                    paddingLeft: 0,
                                                                    color: grey[600],
                                                                    transition: '.3s',
                                                                    height: 'auto',
                                                                }
                                                                : {
                                                                    textDecoration:
                                                                        'none',
                                                                    paddingLeft: '2rem',
                                                                    transition: '.3s',
                                                                    height: 'auto',
                                                                }
                                                        }
                                                        control={
                                                            <Checkbox
                                                                checked={
                                                                    checkedItems[index]
                                                                }
                                                                onChange={() =>
                                                                    handleChange(index)
                                                                }
                                                            />
                                                        }
                                                        label={ingredient || ''}
                                                    />
                                                )
                                            })}
                                </>
                            </Stack>
                            <Typography sx={Title} padding={1}>
                                Como preparar {recipe?.recipeTitle}
                            </Typography>
                            <Stack
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textAlign: 'left',
                                    width: '90%',
                                    bgcolor: '',
                                }}
                            >
                                <>
                                    <Stack width={'90%'}>
                                        {recipe?.modPreps.length > 0 &&
                                            recipe?.modPreps.map((item, index) => {
                                                return (
                                                    <ul key={index}>
                                                        <li>{item}</li>
                                                    </ul>
                                                )
                                            })}
                                    </Stack>
                                </>
                            </Stack>

                            <Card component="ul"
                                sx={{
                                    flexGrow: 1,
                                    minWidth: "90%",
                                    height: '20rem',
                                    mt: '15rem',
                                }}
                            >
                                <CardContent sx={{ zIndex: 1, opacity: 1, height: '100%' }}>
                                    
                                    <iframe
                                        src="https://www.youtube.com/embed/tWcYLB0kkXk"
                                        title="YouTube Video"
                                        width="100%"
                                        height="100%"
                                        frameBorder="0"
                                        allowFullScreen
                                    ></iframe>
                                </CardContent>
                            </Card>

                            {/* <Card component="ul"
                                sx={{
                                    flexGrow: 1,
                                    minWidth: "90%",
                                    height: '20rem',
                                    mt: '15rem',
                                }}
                            >
                                <CardContent sx={{ zIndex: 1, opacity: 1, height: '100%' }}>
                                    {recipe?.videoUrls.length > 0 && recipe?.videoUrls.map((videoUrl, index) => (
                                        <video
                                            key={index}
                                            src={videoUrl}
                                            controls
                                            width="100%"
                                            height="100%"
                                        />
                                    ))}
                                </CardContent>
                            </Card> */}



                        </Card>
                    </Tag.Container>
                </>
            } />
        </>
    )
}
