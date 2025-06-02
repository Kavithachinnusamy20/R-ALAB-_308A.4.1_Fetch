
import axios from "axios";

// Create an Axios instance
const apiClient = axios.create({
    baseURL: "https://api.thecatapi.com/v1/breeds?limit=200&page=0",
    timeout: 5000,
});

// Request Interceptor
apiClient.interceptors.request.use(
    (config) => {
        // Attach an authentication token
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log("Request sent:", config);
        return config;
    },
    (error) => {
        console.error("Request error:", error);
        return Promise.reject(error);
    }
);

// Response Interceptor
apiClient.interceptors.response.use(
    (response) => {
        console.log("Response received:", response);
        return response;
    },
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                console.error("Unauthorized! Redirecting to login...");
                window.location.href = "/login";
            } else if (error.response.status === 500) {
                console.error("Server error! Please try again later.");
            }
        }
        return Promise.reject(error);
    }
);

// Example API call
async function fetchData() {
    try {
        const response = await apiClient.get("/data");
        console.log("Fetched data:", response.data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Call the function
fetchData();
