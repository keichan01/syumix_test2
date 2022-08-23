import React, {useCallback} from 'react';
import {storage} from "../../firebase/index"
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';//@
import {makeStyles} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate"
import {ImagePreview} from "./index";

const useStyles = makeStyles({
    icon: {
        height: 48,
        width: 48
    }
});

const ImageArea = (props) => {
    const images = props.images;
    const setImages = props.setImages;
    const classes = useStyles();

    const deleteImage = useCallback((id) => {
        const ret = window.confirm('この画像を削除しますか？')
        if (!ret) {
            return false
        } else {
            const newImages = images.filter(image => image.id !== id);
            setImages(newImages);
            const deleteI = ref(storage, 'images/' + id);
            return deleteObject(deleteI);
        }
    }, [images, setImages]);

    const uploadImage = useCallback((e) => {
        const file = e.target.files;
        let blob = new Blob(file, { type: "image/png"|| "image/jpeg" || "image/JPG" });

        //各画像に一意のidをふる
        const S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const N=16;
        const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N))).map((n)=>S[n%S.length]).join('')

        //ここでアップロード
        const uploadRef = ref(storage, 'images/' + fileName);
        const uploadTask = uploadBytes(uploadRef, blob);

        uploadTask.then((snapshot) => {
            getDownloadURL(snapshot.ref).then((downloadURL) => {
                const newImage = { id: fileName, path: downloadURL }
                setImages((prevState) => [...prevState, newImage]);
              });
            });
        }, [setImages]);

    return (
        <div>
            <div className="p-grid__list-images">
                {images.length > 0 && (
                    images.map(image => <ImagePreview delete={deleteImage} id={image.id} path={image.path} key={image.id} /> )
                )}
            </div>
            <div className="u-text-right">
                <span>画像を登録する</span>
                <IconButton className={classes.icon}>
                    <label>
                        <AddPhotoAlternateIcon />
                        <input className="u-display-none" type="file" id="image" onChange={e => uploadImage(e)}/>
                    </label>
                </IconButton>
            </div>
        </div>
    );
};

export default ImageArea;