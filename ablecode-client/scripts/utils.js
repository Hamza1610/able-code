async function requestGet(url, headers = '') {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: headers,
        })

        if (!response.ok) {
            return {
                message: "Request failed",
                status: response.status
            }
        }

        return {
            message: await response.json(),
            status: response.status,
        }

    } catch (error) {
        console.error(error);
        return {
            message: 'ERROR OCCURED',
            status: 500,
            error: error
        }
    }
}

async function requestPost(url, headers, body) {

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: body
        })

        if (!response.ok) {
            return {
                message: "Request failed",
                status: response.status
            }
        }

        return {
            message: await response.json(),
            status: response.status,
        }

    } catch (error) {
        console.error(error);
        return {
            message: 'ERROR OCCURED',
            status: 500,
            error: error
        }
    }
}


module.export = { requestGet, requestPost }