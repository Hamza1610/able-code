import JSON from './config.json'
async function loadEnv() {
    const response = JSON;
    const env = await response.json();
    console.log(env.API_KEY); // Use your environment variable
    return env
}
export default  env = await loadEnv();
