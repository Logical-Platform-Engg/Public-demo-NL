const axios = require('axios');

const triggerWorkflow = async (metadata, github_token) => {
    //console.log(github_token)
    // console.log(metadata.variables)
    const json_data =  metadata.variables
    const input_data = {};
    for (const key in json_data) {
        if (Object.hasOwnProperty.call(json_data, key)) {
            input_data[key] = JSON.stringify(json_data[key]);
        }
    }

    const data_gh = {
        ref: metadata.environment,
        inputs: input_data
    };

    const config = {
        method: 'post',
        url: `https://api.github.com/repos/${metadata.github_owner}/${metadata.github_repo}/actions/workflows/${metadata.workflow_file}/dispatches`,
        headers: { 
            'Authorization': `Bearer ${github_token}`,
            'Content-Type': 'application/vnd.github.v3+json', 
            'User-Agent': 'Node.js' 
        },
        data: JSON.stringify(data_gh)
    };

    try {
        const response = await axios(config);
        console.log('Workflow triggered successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error triggering workflow:', error.response ? error.response.data : error.message);
        return error.response ? error.response.data : error.message;
    }
};




module.exports = { triggerWorkflow};