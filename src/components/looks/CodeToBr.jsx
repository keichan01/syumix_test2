import HTMLReactParser from "html-react-parser";

//reactでは改行コードが空白となるため変更
const CodeToBr = (text) =>{
    if(text === ''){
        return text
    }else{
        return HTMLReactParser(text.replace(/\r?\n/g, '<br./>'));
    }
}

export default CodeToBr