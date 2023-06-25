import * as admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC5NzFk2d1J1V0v\nF586+APjg8nXobfT6276QbpP48aUBzsFv+WjUgTuf0rkV5OMrW1nTh5XhaEWCmNX\neLqZnjCxSy/FqWs87Gf6/64gN20NLjHwSoOgJXsioNOfGLbGOmgd+5iCFDAc0GRI\nYvfP2IgqYYkrFZKEGOw+feYYhOD+mpyhlgYK1NdFIAENWylJnSUH0QhGc43Yeng7\ny171HXw8ZNEepuH/wtvOCabtbq7SSZmsAQ+TGOFEIACpG4X27Bbpi+Ewxan4yPoN\n8ZFrH8btj0e9nEEeWslAxZ439jiJ4kZH1Zg42PGfAW2fvwkhfwsGHQnsF4zdnN3q\nQ2TCVju7AgMBAAECggEAAJeSE1n08KL7eMaRDj2zuXr23rcYINfMU4V5RH8cZ+W8\nBREveT2uYVrL0P4MrTLyuhVQWIRHVwwydBmhMxOD4VU1smKPwrKYxH8jvdufgB7J\nLxT15cGo6pvsAUKxduHB6nKe8q+A1d6+q1KRqzrseII2T4pynPR9cNezMBngpD+1\n4YXc05xaNCztwuT9qVStyptXM8vn2wkonA30upJXst9u6TTGG1ocFR8jUMF7lPeF\nyUttgCSVXztm65xX76yO1Q+8Sy445zHuzIxqJxzE5khUuDnayfD0RtIKIMc0iCRt\nYMcqiM9SKbYS9/WWf1j/A+ZzzWCHPXzhcQg7NWTF/QKBgQDvCVrum1mtv0R7VWa5\ncp81EAY1MYccho+zNyzlg1fkRLKtQJWTXuiIx/z/YICJp1pJ+yDM9jeDUkQiqWZT\nlGEKS9rtrcQ7GAgmIk4Wu1vXNrBuv2VTL6OBO+7w0im+eiuOWrFKF89SDqYFt169\nrUhkDeRbHpXUI9vXFclpRew2FwKBgQDGXA6si/p46oHJJGafGmULHOaNQznZ3my6\n+1/O8pniPmh52FfMVgyBLOH2fx/VMOq5nRAqssXaz08n6WPhGnRvctcCRxw2xNlG\nMkBBOLhQL5AHW5qANK52Hh0AtqbUD8OGL685/v/hgqA6CyIHGmhPHYfc1agR6KbX\nR72Bv6TR/QKBgAHvznfOdGyO9ywUpg9smVOhvJsjupeFk5Z9JPT7GnQ0BkqXEl8u\nTq4FCMy86G21GGsvCLYAbLS4ruqk+rpEooCl2rFATi24ZSCB+KYAgJ7+x3EuRdDl\nuupqJOZ4nXP4o2+01mjmRnzAt6GmObNJuyNsZWRDnC0q2TYl7ArZUS+jAoGAMX7N\nBo8TG9LgObGEjdTHO8OlX8BTkiKnHO0WlgwBC+woo6axGcKq8hyh8aD873R6TYB8\nhTsAlb2+8aWSD5xLS3frYJ0f1CbAVHy7fcrKau/DT6Ky5aS/l6eh8wigji+0ySni\n3mTbsoimtHUMs5sKRhuHSDpj6rwTzYoQJm0Mkn0CgYAKuETYiV3wPISHXZUM9BoL\nS2INmPVokXOPKHYwfrGSdfTHdOow5Rsr9X9PezQ/P8J3oBa1DZhnwHd2dMe7kHKy\n7W9Ia9eHPRJNKW6UGVMkE331gTgTmShiL+qxkQFBxYa/3/1w6zBSJ/w5vQ55t4jy\nEnXwIcWE9BZkIUQsh11dQg==\n-----END PRIVATE KEY-----\n'.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
  }),
});
export default firebaseApp;
