import { Alert, Box, Button, Card, CardActions, CardContent, CardMedia, Checkbox, FormControlLabel, FormGroup, LinearProgress, Link, Stack, Tooltip, Typography, useMediaQuery } from "@mui/material"

import { useParams } from 'react-router-dom';







import {
    ArrowBack as ArrowBackIcon,
    AvTimer as AvTimerIcon,
    ElectricBolt as ElectricBoltIcon,
    PersonAddAlt1 as PersonAddAlt1Icon,
    Add as AddIcon,
    PieChartOutline as PieChartOutlineIcon,
    DataSaverOff as DataSaverOffIcon
} from '@mui/icons-material'



import * as Tag from './index.js'
import { green, grey, orange } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { api } from "../../api/index.js";
export const DetailsRecipes = () => {
    const { id } = useParams();
    const [recipe, setrecipe] = useState(null);
    const [ingredientes, setingredientes] = useState([]);
    const [modopreparos, setmodopreparos] = useState([]);
    const matches = useMediaQuery('(min-width:800px)');
    const [progress, setProgress] = useState(false);

    var Title = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '8rem',
        width: 'auto',
        color: orange[900],
        fontWeight: '900',
        margin: '2rem 0 1rem 0'
    }
    const [checkedItems, setCheckedItems] = useState(Array(5).fill(false));
    useEffect(() => {
        const obterDetalhesrecipe = async () => {
            const doc = await api.recipe.get(id)
            const docIngredientes = await api.ingredientes.get(id)
            const getModosPre = await api.modopreparo.get(id)
            if (doc) {
                setrecipe(doc)
                docIngredientes.map((i) => {
                    return (
                        setingredientes(i?.description)
                    )
                })
                getModosPre.map((i) => {
                    return (
                        setmodopreparos(i?.description || i?.descripion)
                    )
                })
            }
        };

        obterDetalhesrecipe();
    }, [id]);

    const handleChange = (index) => {
        const newCheckedItems = [...checkedItems];
        newCheckedItems[index] = !newCheckedItems[index];
        setCheckedItems(newCheckedItems);
    };
    if (!recipe) {
        return <>
            <Tag.Container>
                <Stack sx={{ width: '100%', bgcolor: 'green', position: 'fixed', top: 0, left: 0 }}>
                    <LinearProgress sx={{ height: '0.5rem', }} variant='indeterminate' />
                </Stack>
                <Alert severity="info">Carregando informações, por favor aguade...</Alert>
            </Tag.Container>
        </>
    }

    return (
        <>
            <Tag.Container sx={{
                gap: '3rem'
            }}>

                <Tag.UserSections >
                    <Tooltip
                        sx={{
                            cursor: 'pointer',
                            "&:hover": {
                                border: "1px solid black",
                                color: 'black',
                                padding: '0.3rem',
                                bgcolor: "rgba(255, 255, 255)",
                                transition: "all 200ms"
                            }
                        }}
                        title="Voltar para as receitas"
                        followCursor
                    >
                        <Link href="/">
                            <ArrowBackIcon fontSize="large" />
                        </Link>
                    </Tooltip>
                    <Stack direction={'row'} sx={{
                        color: orange[500],
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '2rem'
                    }}>
                        <Stack direction={'column'}>
                            <Typography variant="body1">
                                {recipe?.userName}
                            </Typography>
                            <Typography variant="body2">
                                POST: {recipe?.dataPost}
                            </Typography>
                        </Stack>
                        <CardMedia
                            sx={{ height: '4rem', width: '4rem', borderRadius: '50%' }}
                            component="img" image={recipe?.avatar}
                        />
                    </Stack>

                </Tag.UserSections>

                <Card sx={matches ? {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    width: '70%',
                    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                    mt: '4rem',
                    padding: '0 0 10rem 0'

                } : {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}>
                    <Tag.Midias
                        component="img"
                        alt="green iguana"
                        height="140"
                        image={recipe?.avatar}
                    />

                    <Stack sx={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        mt: '-1.5rem',
                        height: '3rem',
                        width: '100%',
                        padding: '0 1.4rem 0 0'
                    }}>

                        <Button sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            bgcolor: orange[900]
                        }} variant={'contained'} startIcon={<AddIcon />}>
                            Seguir o user
                        </Button>
                    </Stack>


                    <CardContent padding={1}>
                        <Typography gutterBottom variant="h4" component="div">
                            {recipe?.titleRecipe}
                        </Typography>
                        <Typography color={grey[900]} gutterBottom variant="body1" component="div">
                            Geralmente é para o almoço ou jantar
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {recipe?.description}
                        </Typography>
                    </CardContent>


                    <Typography sx={Title} variant="body1" >
                        IMPORTANTES SOBRE A RECEITA
                    </Typography >


                    <CardActions sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: 2,
                        gap: '2rem',
                        width: '95%',
                    }}>

                        {[{
                            title: recipe?.tempo,
                            desc: 'Preparo',
                            icon: <AvTimerIcon />

                        }, {
                            title: recipe?.calories,
                            desc: 'Rendimento',
                            icon: <PieChartOutlineIcon />
                        }, {
                            title: recipe?.porcoes,
                            desc: 'Gra. por Porção',
                            icon: <DataSaverOffIcon />
                        }].map((item) => {
                            return (
                                <>
                                    <Stack sx={{
                                        border: `1px solid ${orange[900]}`,
                                        color: orange[700],
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexDirection: 'row',
                                        fontSize: '100%',
                                        borderRadius: '10px',
                                        gap: '1rem'
                                    }}>
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
                        Informações Nutricionais de {recipe?.titleRecipe}
                    </Typography>
                    <Tag.NutInfo>
                        {[
                            {
                                name: 'Calorias',
                                val: '190,54 kcal'
                            },
                            {
                                name: 'Proteínas',
                                val: '14,00 g'
                            },
                            {
                                name: 'Gorduras Totais',
                                val: '15,85 g'
                            },
                            {
                                name: 'Gord. Saturadas',
                                val: '9,05 g'
                            },
                            {
                                name: 'Gord. Trans',
                                val: '6,23 g'
                            },
                            {
                                name: 'Carboidratos',
                                val: '0,00 g'
                            },
                            {
                                name: 'Fibras',
                                val: '1,99 g'
                            },
                            {
                                name: 'Sódio',
                                val: '42,26 mg'
                            },
                        ].map((nut) => {
                            return (<Tag.Info sx={matches && {

                                width: '20%',
                                height: '5rem',

                            }}>
                                <Typography sx={{
                                    color: grey[600],
                                    fontSize: '14px'
                                }} variant="p" >{nut?.name}</Typography>
                                <Typography variant="body3" >{nut?.val}</Typography>
                            </Tag.Info>)
                        })}
                    </Tag.NutInfo>

                    <Typography sx={Title} padding={1}>
                        INGREDIENTES DESTA RECEITA
                    </Typography>
                    <Stack sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        textAlign: 'left',
                        width: '90%',
                        bgcolor: ''
                    }}>
                        <>
                            {ingredientes.length > 0 && ingredientes.map((ingredient, index) => {
                                return (
                                    <FormControlLabel key={index} sx={checkedItems[index] ? {
                                        textDecoration: 'line-through',
                                        paddingLeft: 0,
                                        color: grey[600],
                                        transition: '.3s',
                                        height: '30px'
                                    } : {
                                        textDecoration: 'none',
                                        paddingLeft: '2rem',
                                        transition: '.3s',
                                        height: '30px'
                                    }} control={<Checkbox
                                        checked={checkedItems[index]}
                                        onChange={() => handleChange(index)}
                                    />} label={ingredient || ''} />
                                )
                            })}

                        </>
                    </Stack>
                    <Typography sx={Title} padding={1}>
                        MODOS DE PREPARO
                    </Typography>
                    <Stack sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'left',
                        width: '90%',
                        bgcolor: ''
                    }}>
                        <>
                            <Stack width={"90%"}>
                                {modopreparos.length > 0 && modopreparos.map((p, index) => {
                                    return (
                                        <ul key={index}>
                                            <li>{p}</li>
                                        </ul>
                                    )
                                })}
                            </Stack>
                        </>
                    </Stack>
                </Card>
            </Tag.Container>
        </>
    )

}


