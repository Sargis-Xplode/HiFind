import axios from "axios";

export const checkAuth = async (token: string) => {
    const url = "api/protectedRoute";
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    try {
        const response = await axios.get(url, { headers });
        console.log("Data:", response.data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
