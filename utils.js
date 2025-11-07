function createElementFromString(htmlText){
    return new DOMParser().parseFromString(htmlText, "text/html").getRootNode().body.firstChild;
};
