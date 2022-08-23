import {db, FirebaseTimestamp} from '../../firebase/index';
import {push} from "connected-react-router";
import {deletePostAction, fetchPostsAction} from "./actions"
import { collection, setDoc, getDocs, doc, orderBy, query, deleteDoc, writeBatch, getDoc, where } from 'firebase/firestore';
import { PostList } from '../../templates';

const postsRef = collection(db, "posts");
//const docRef = doc(db, "posts");

//firestoreから商品情報を取得し、それをpropsとしてPostListに渡す。
//インドアだけを取得等の縛りがある=>その情報を引数として取得(引数はPostListで渡される)
export const fetchPosts = () =>{

  return async(dispatch) =>{
    
    //let q = query(postsRef, orderBy('updatated_at', 'desc'));

    //ここからdataを絞り込む。doorで先にいらんもんは除外(未実装)

    const querySnapshot = await getDocs(postsRef);
    const postList = [];
    querySnapshot.forEach(doc =>{
      const post = doc.data();
      postList.push(post);
    })
    dispatch(fetchPostsAction(postList))
    /*
    getDocs(q).then(snapshots =>{
      const postList = [];
      snapshots.forEach(snapshot =>{
        const post = snapshot.data();
        postList.push(post);
      });
      //検索内容により順序入れ替え(未実装)
      dispatch(fetchPostsAction(postList))
    });
    */
  }
};


export const savePost = (id, name, attract, door, price, images) => {
    return async (dispatch) => {
      const timestamp = FirebaseTimestamp.now();
  
      const data = {
        attract: attract,
        name: name,
        door: door,
        images: images,
        price: parseInt(price, 10),
        updated_at: timestamp,
        id:id
      }
      let setData;
      if (id === "") {
        const ref = doc(postsRef);
        id = ref.id;
        setData = {
          ...data,
          created_at:timestamp,
          id:id,
        }
      }else{
        setData=data;
      }

      return setDoc(doc(postsRef, id), setData, {marge:true}).then(() =>{
        dispatch(push("/"));
        alert("投稿完了");
      }).catch((error) =>{
        throw new Error("投稿に失敗しました。");
      });
    }
}

//投稿削除。一度すべての投稿を入手=>消す投稿のid以外のidを持つ投稿をnewPostsとし、store更新
//react-redux側のデータフローはuserのコードのコメント参照
export const deletePost = (id) => {
  return async(dispatch, getState) =>{
    deleteDoc(doc(postsRef, id)).then(() =>{//firestoreからはここで消える
      const prevPosts = getState().posts.list;
      const newPosts = prevPosts.filter((post) => post.id !== id);
      dispatch(deletePostAction(newPosts));//ここでstore更新
    })
  }
}