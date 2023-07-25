import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  MoreVert as MoreVertIcon,
  Delete as DeleteIcon,
  Details as DetailsIcon
} from '@mui/icons-material'
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Container,
  Grid,
  IconButton,
  Link,
  Tooltip,
  styled,
  useMediaQuery,
} from '@mui/material'
import { useContext, useEffect, useState } from 'react'
export const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
import { useTheme } from '@mui/material/styles';
import * as Tag from './index.js'
import { api } from '../../api/index.js'
import { AuthContext } from '../../contexts/AuthContext.jsx'
import { INTERFACE } from '../INTERFACE/index.jsx'
export const FavoriteRecipes = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([])
  const { user } = useContext(AuthContext)
  const [expanded, setExpanded] = useState([]);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const handleExpandClick = (index) => {
    setExpanded((prevState) => {
      const newExpanded = [...prevState];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };
  const deleteFavorite = async (recipeId, userId) => {
    if (recipeId && userId) return
    try {
      await api.favoriteRecipes.remove(recipeId, userId)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      const userId = user.uid

      if (userId) {
        try {
          const recipes = await api.favoriteRecipes.get(userId)
          setFavoriteRecipes(recipes)
        } catch (error) {
          console.error('Erro ao buscar as receitas favoritas:', error)
          setFavoriteRecipes([]) // Define uma lista vazia em caso de erro
        }
      } else {
        console.log('Erro ao buscar as receitas favoritas:', userId)
        setFavoriteRecipes([]) // Define uma lista vazia se o ID do usuário não estiver disponível
      }
    }
    fetchFavoriteRecipes()
  }, [user])
  if (favoriteRecipes.length === 0) {
    return (
      <>
        <INTERFACE RENDERPAGE={<>
          <Tag.Contain sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '16px',
            color: 'black',
            borderRadius: '4px',
            animation: 'floatingAnimation 2s ease-in-out infinite',
            '@keyframes floatingAnimation': {
              '0%': {
                transform: 'translate(-50%, -50%)',
              },
              '50%': {
                transform: 'translate(-50%, -40%)',
              },
              '100%': {
                transform: 'translate(-50%, -50%)',
              },
            },
          }}>Você não tem nenhuma receita por enquando!</Tag.Contain>
        </>} />
      </>
    )
  }
  return (
    <>
      <INTERFACE RENDERPAGE={<>
        <Tag.Contain>
          {favoriteRecipes?.map((favorite, index) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Tag.FavoriteCard
                  key={index}
                  sx={{
                    width: isSmallScreen ? '100%' : 345,
                    backgroundImage: `url(${!favorite?.recipeImage ? "https://www.biotecdermo.com.br/wp-content/uploads/2016/10/sem-imagem-10.jpg" : favorite?.recipeImage})`,
                  }}
                >
                  <Tag.FavoriteBox>
                    <CardHeader
                      avatar={
                        <Avatar
                          src={favorite?.recipeImage}
                          sx={{ bgcolor: "#212121", textTransform: 'uppercase' }}
                          aria-label="recipe"
                        >
                          {favorite?.recipeTitle?.charAt(0)}
                        </Avatar>
                      }
                      action={
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={favorite?.name}
                      subheader={favorite?.creationDate}
                    />
                    <CardMedia
                      sx={{
                        display: 'none',
                        transition: '.3s',
                      }}
                      className="imageCardMedia"
                      component="img"
                      height="194"
                      image={favorite?.recipeImage}
                      alt="Paella dish"
                    />


                    <CardContent sx={{ color: 'white' }}>
                      <Typography variant="body2">
                        {favorite?.recipeDescription}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <Tooltip title={`Deletar a receita de "${favorite?.recipeTitle}" dos seus favoritos`}>
                        <IconButton
                          onClick={() => deleteFavorite(favorite?.id, user?.uid)}
                          size="small"
                          sx={{ ml: 2, color: "#374957" }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                      <Link href={`detailsRecipes/${favorite?.id}`}>
                        <Tooltip title={`"Detalhar a receita de "${favorite?.id}"`}>
                          <IconButton
                            size="small"
                            sx={{ ml: 2, color: "#374957" }}
                          >
                            <DetailsIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                      <ExpandMore
                        expand={expanded[index]}
                        onClick={() => handleExpandClick(index)}
                        aria-expanded={expanded}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
                      <CardContent>
                        <Typography paragraph>Descripstion</Typography>
                        <Typography paragraph>{favorite?.description}</Typography>
                      </CardContent>
                    </Collapse>
                  </Tag.FavoriteBox>
                </Tag.FavoriteCard>
              </Grid>
            )
          })}
        </Tag.Contain>
      </>} />
    </>
  )
}
