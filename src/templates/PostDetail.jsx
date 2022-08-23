import React, {useEffect, useCallback, useState} from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import makeStyles from '@material-ui/core/styles/makeStyles';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { CodeToBr } from "../components/looks/";
import { ImageSwiper } from "../components/Posts";

const useStyles = makeStyles((theme) =>({
    sliderBox:{
        [theme.breakpoints.down('sm')]: {
            margin:'0 auto 0 auto',//上右下左
            height: 350,
            width: 350
        },
        [theme.breakpoints.up('sm')]:{
            margin: '0 auto',
            height: 500,
            width: 500

        }
    },
    detail:{
        [theme.breakpoints.down('sm')]:{
            textAlign: 'left',
            margin: '0 auto 16 px auto',
            height: 'auto',
            width:320,
        },
        [theme.breakpoints.up('sm')]:{
            textAlign: 'left',
            margin: '0 auto',
            height: 'auto',
            width: 400
        }
    },
    price:{
        fontSize: 36
    }
}));

const PostDetail = () => {
    console.log("detail")
    const classes = useStyles();
    const selector = useSelector(state => state);
    const dispatch = useDispatch();
    
    const [post, setPost] = useState(null);


    useEffect(() =>{
        //このtemplateが呼び出される時、push('/post/' + id)されているはず
        //よって今のurlの末尾を取得すればそれが投稿id
        let id = window.location.pathname.split('/post')[1];
        if (id !== '') {
          id = id.split('/')[1];
        }
        getDoc(doc(db, 'posts', id)).then((snapshot) =>{
            const detail = snapshot.data();
            setPost(detail);
        });
    }, [dispatch]);
    return(
        <section className="c-section-wrapin">
            {post &&(
                <div className="p-grid__row">
                    <div className={classes.sliderBox}>
                        <ImageSwiper images={post.images}/>
                    </div>
                    <div className={classes.detail}>
                        <h2 className="u-text__headline">{post.name}</h2>
                        <p className={classes.price}>￥{post.price.toLocaleString()}</p>
                        <div className="module-spacer--small" />
                    </div>
                    <div>
                    <p>{CodeToBr(post.attract)}</p>
                    </div>
                </div>
            )}
        </section>
    )
}

export default PostDetail;