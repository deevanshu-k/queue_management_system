module.exports.authQueueManager = async (req, res) => {
    // Get queueId and pswd from query
        // If not found : wrong cridentials
    // Authenticate Cridentials
        // If not authenticate : wrong auth link
    // Create Token 
        // Token data = queueId, managername, topic
    // Send Response
    res.send("Auth Manager And Send Token");
};
