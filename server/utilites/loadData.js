// cashe data
let cachedData = null;

// Function to load data from MongoDB
const loadData = async () => {
    if (cachedData) {
        console.log("cashed exsite")
        
        return cachedData;
    } else {
        console.log("cashed not exsite")
        // try {
        //     cachedData = await Data.find();  
        // } catch (err) {
        //     throw new Error('Error fetching data from MongoDB: ' + err.message);
        // }
    }
};


export default loadData;