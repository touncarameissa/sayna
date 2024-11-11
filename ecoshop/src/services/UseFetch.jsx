import { useEffect, useState } from "react"
const UseFetch = (url) => {
    const [data,setData]=useState([])
    useEffect(()=>{
        // Charger le fichier JSON
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erreur lors du chargement des données");
                }
                return response.json();
            })
            .then((data) => setData(data))
            .catch((error) => console.error("Erreur:", error));
    },[url])
    return data
}

export default UseFetch
