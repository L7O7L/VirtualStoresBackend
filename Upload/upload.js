import plazavea from '../plazavea.json' assert { type: 'json' };
import admin from 'firebase-admin';
import productos from '../products.json' assert { type: 'json' };
import tottus from '../tottus.json' assert { type: 'json' };
import serviceAccount from '../key.json' assert { type: 'json' };


admin.initializeApp({

    credential: admin.credential.cert(serviceAccount)

})

const upload = async function UploadToFirestore(){

    const db = admin.firestore();
    db.collection('virtualStores').doc("plazavea").set(plazavea);   
    db.collection('virtualStores').doc("tottus").set(tottus);
    db.collection('allProducts').doc("products").set(productos);

}

export {

    upload

}
