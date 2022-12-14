import React, { useCallback, useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import {doc, getDoc, getDocs, collection, query, orderby} from 'firebase/firestore';
import { db } from '../firebase';
import { TextInput, SelectBox, PrimaryButton } from "../components/UIkit";
import { savePost } from "../reducks/posts/operations";
import {ImageArea} from "../components/Posts";

const PostEdit = () =>{
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [attract, setAttract] = useState("");
    const [images, setImages] = useState([]);
    const [price, setPrice] = useState("");
    const [door, setDoor] = useState("");
    const [doors, setDoors] = useState([]);

    const inputName = useCallback(event =>{
        setName(event.target.value)
    }, [setName])

    const inputAttract = useCallback(event =>{
        setAttract(event.target.value)
    }, [setAttract])

    const inputPrice = useCallback((event) => {
        setPrice(event.target.value)
    }, [setPrice])

    const Doors = [
        {id: "indoor", name: "γ€γ³γγ’π "},
        {id: "outdoor", name: "γ’γ¦γγγ’π"}
    ];

    let id = window.location.pathname.split('/post/edit')[1];
    if (id !== "") {
        id = id.split('/')[1]
    }
    useEffect(() => {
        if (id !== '') {
          getDoc(doc(db, 'posts', id)).then((snapshot) => {
            const post = snapshot.data();
            if (post) {
              setImages(post.images);
              setName(post.name);
              setAttract(post.attract);
              setDoor(post.door);
              setPrice(post.price);
            }
          });
        }
      }, [id]);
    
    return (
        <section>
            <h2 className="u-text__headline u-text-center">
                ζη¨Ώγ»η·¨ι
            </h2>
            <div className="c-section-container">
            <ImageArea  images={images} setImages={setImages} />
            <TextInput
                    fullWidth={true} label={"θΆ£ε³"} multiline={false} required={true}
                    onChange={inputName} rows={1} value={name} type={"text"}
            />
            <TextInput
                fullWidth={true} label={"ι­ε"} multiline={true} required={true}
                onChange={inputAttract} rows={5} value={attract} type={"text"}
            />
            <TextInput
                fullWidth={true} label={"δΎ‘ζ Ό(ζ°ε€γ?γΏε₯εγγ¦δΈγγ)"} multiline={false} required={true}
                onChange={inputPrice} rows={1} value={price} type={"number"}
            />
            <SelectBox
                    label={"γ€γ³γγ’γγ’γ¦γγγ’γ"} options={Doors} required={true} select={setDoor} value={door}
            />
            <div className="module-spacer--small" />
            <PrimaryButton
                    label={"εεζε ±γδΏε­"}
                    onClick={() => dispatch(savePost(id, name, attract, door, price, images))}
                />
            </div>
        </section>
    )
}
export default PostEdit;