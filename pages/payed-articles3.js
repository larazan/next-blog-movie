import { Box } from 'reflexbox'
import getConfig from 'next/config'

function PayedArticles({ articles, authData }) {
    console.log(articles, authData);
    
    return (
        <>
            <Box variant="container">
                <Box as="h2" my={40}>
                    Payed Articles
                </Box>    
            </Box>    
        </>
    );
}

const { publicRuntimeConfig } = getConfig();

export async function getServerSideProps() {

    const loginInfo = {
        identifier: 'test@test.com',
        password: '1234567'
    }

    const login = await fetch(`${publicRuntimeConfig.API_URL}/auth/local`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
    })

    const loginResponse = await login.json()

    const res = await fetch(`${publicRuntimeConfig.API_URL}/payed-articles`, {
        headers: {
            Authorization: `Bearer ${loginResponse.jwt}`
        }
    })
    const articles = await res.json()

    return {
        props: {
            articles: articles,
            authData: loginResponse
        }
    };

   
}

export default PayedArticles;
