/**
 * @param {String} urlPath
 */
// fetch data (json 데이터 반환)
const fetchData = async (url, options = null) => {
    try {
        const res = await fetch(url, options);        
        const data = await res.json();
        return {
            ...data,
            status: res.status,
        };
    } catch (error) {
        console.error(error);
    }
};

export { fetchData };