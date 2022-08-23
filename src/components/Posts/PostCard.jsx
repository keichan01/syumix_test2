import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {push} from "connected-react-router"
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import noimage from '../../assets/imgs/noimage.png';
import { deletePost } from '../../reducks/posts/operations';

const useStyles = makeStyles((theme) =>({
    root:{
        //breakpointで表示の折り返し地点を決めている。
        [theme.breakpoints.down('sm')]:{
            margin: 8,
            width: 'calc(50% - 16px)'
        },
        [theme.breakpoints.up('sm')] :{
            margin:16,
            width: 'calc(33.3% - 32px)'
        }
    },
    content:{
        display:'flex',
        padding:'16px 8px',
        textAlign: 'left',
        '&:last-child':{
            paddingBottom:16
        }
    },
    media:{
        height:0,
        paddingTop:'100%'
    },
    price:{
        color: theme.palette.secondary.main,
        fontSize: 16
    },
    icon:{
        marginRight:0,
        marginLeft: 'auto'
    }
}));


const PostCard = (props)  =>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const price = props.price.toLocaleString();

    //propsで渡ってきたimages(空でも空の配列として渡される)の中身があるかどうか
    //無ければフリー素材のnoimage画像をprops.imagesとする。?は条件演算子。
    const images = (props.images.length > 0) ? props.images[0].path : noimage;


    //縦に三つ・がある編集、削除ボタンの開閉を感知する
    const [anchorEl, setAnhorEl] = useState(null);
    const handleClick = (event) =>{
        setAnhorEl(event.currentTarget);
    };
    const handleClose = () =>{
        setAnhorEl(null);
    };

    return(
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={images}
                title=""
                onClick={() =>{
                    dispatch(push('/post/' + props.id))
                    console.log("clicked:::::id=", props.id)
                    }
                }
            />
            <CardContent className={classes.content}>
                <div>
                <Typography  color = "textSecondary" component = "p">
                    {props.name}
                </Typography>
                <Typography className={classes.price} component = "p">
                    ￥{price}
                </Typography>
                </div>
                <IconButton className={classes.icon} onClick={handleClick}>
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={() =>{
                        dispatch(push('/post/edit/' + props.id))
                        handleClose()
                    }}>
                        編集する
                    </MenuItem>
                    <MenuItem onClick={() =>{
                        dispatch(deletePost(props.id))
                        handleClose()
                    }}>
                        削除する
                    </MenuItem>
                </Menu>
            </CardContent>
        </Card>
    )
}

export default PostCard
/*
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

*/