// const strapiUrl = 'http://localhost:1337/api';
const strapiUrl = import.meta.env.STRAPI_API_URL || 'http://localhost:1337/api';

// La vamos usar para las images
export const STRAPI_BASE_URL = strapiUrl.replace('/api', '');

export const STRAPI_URL = strapiUrl;

// Funcion para obtener datos de la API - slug (parametro) es la ruta de la API
// Funcion para obtener datos de la API - slug (parametro) es la ruta de la API
export const fetchFromAPI = async (slug: string) => {
    // Validacion
    try {
        // Fetch a la API - ¡AQUÍ ESTÁ LA CORRECCIÓN!
        const response = await fetch(`${STRAPI_URL}/${slug}?populate=*`);
        // Convertir a JSON
        const json = await response.json();

        console.log(json);

        if(!response.ok) {
            // Es mejor lanzar un Error directamente o usar un tipo de dato 'any' si 'json.message' no es de tipo string
            throw new Error(`Error en la respuesta de la API: ${json.message}`);
        }

        // Si tiene results, es una lista, si no, es un objeto individual
        return json.data;
    } catch (error) {
        console.error(error);
        // Podrías devolver 'null' o lanzar el error nuevamente si es necesario que el llamador lo maneje.
    }
};