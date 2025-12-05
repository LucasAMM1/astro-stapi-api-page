// Dirección base de la API de Strapi
const strapiURL = import.meta.env.STRAPI_API_URL || 'http://localhost:1337/api';

// URL base para construir rutas de imágenes
export const STRAPI_BASE_URL = strapiURL.replace('/api', '');
export const STRAPI_URL = strapiURL;


export async function fetchFromApi(slug: string) {
    try {
        const response = await fetch(`${STRAPI_URL}/${slug}?populate=*`);
        const json = await response.json();

        if (!response.ok) {
            console.error('Error en la respuesta de la API:', json.error?.message || response.statusText);
            return [];
        }

        if (!json.data) {
            console.warn('La respuesta no contiene datos:', json);
            return [];
        }

        return json.data;
    } catch (error) {
        console.error('Error al obtener datos de la API:', error);
        return [];
    }
}