//let URL = window.location.href.replace('/panel', '') + '/upload';
//Test API Server
let URL = 'http://172.106.202.159/upload';
let FILES_URL = 'http://172.106.202.159/files/';

function uploadDocument(loadId, rateCon, bol) {

    if(rateCon) {
        let extension = rateCon.name.split('.');
        uploadFile(new File([rateCon], loadId + '-rate.' + extension[extension.length -1], {type: rateCon.type}));
    }

    if(bol) {
        let extension = bol.name.split('.');
        uploadFile(new File([bol], loadId + '-bol.' + extension[extension.length -1], {type: bol.type}));
    }
}

async function uploadLogo(logo) {
    return await uploadFile(new File([logo], 'logo.png', {type: logo.type}));
}

async function uploadFile(file) {
    let formData = new FormData();
    formData.append('file', file);

    let options = {
        method: 'POST',
        body: formData
    };

    return await fetch(URL, options);
}

export {FILES_URL, uploadFile, uploadDocument, uploadLogo};