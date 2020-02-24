let URL = window.location.href.replace('/panel', '') + '/upload';

function uploadDocument(loadId, rateCon, bol) {

    if(rateCon) {
        let extension = rateCon.name.split('.');
        uploadFile(new File([rateCon], loadId + '-rate.' + extension[extension.length -1], {type: rateCon.type}));
    }

    if(bol) {
        let extension = bol.name.split('.');
        uploadFile(new File([bol], loadId + '-bol.' + extension[extension.length -1], {type: bol.type})).then(d => console.log("success!"));
    }
}

async function uploadLogo(logo) {
    return await uploadFile(new File([logo], 'logo.' + logo.type.split('/')[1], {type: logo.type}));
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

export {uploadFile, uploadDocument, uploadLogo};