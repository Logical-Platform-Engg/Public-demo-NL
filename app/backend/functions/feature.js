// const axios = require('axios');

// const triggerWorkflow = async (metadata, github_token) => {
//     //console.log(github_token)
//     // console.log(metadata.variables)
//     const json_data =  metadata.variables
//     const input_data = {};
//     for (const key in json_data) {
//         if (Object.hasOwnProperty.call(json_data, key)) {
//             input_data[key] = JSON.stringify(json_data[key]);
//         }
//     }

//     const data_gh = {
//         ref: metadata.environment,
//         inputs: input_data
//     };

//     const config = {
//         method: 'post',
//         url: `https://api.github.com/repos/${metadata.github_owner}/${metadata.github_repo}/actions/workflows/${metadata.workflow_file}/dispatches`,
//         headers: { 
//             'Authorization': `Bearer ${github_token}`,
//             'Content-Type': 'application/vnd.github.v3+json', 
//             'User-Agent': 'Node.js' 
//         },
//         data: JSON.stringify(data_gh)
//     };

//     try {
//         const response = await axios(config);
//         console.log('Workflow triggered successfully:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error('Error triggering workflow:', error.response ? error.response.data : error.message);
//         return error.response ? error.response.data : error.message;
//     }
// };

// module.exports = { triggerWorkflow};

const { spawn } = require('child_process');

async function runCommand(command, args) {
    return new Promise((resolve, reject) => {
        const cmd = spawn(command, args);

        let stdout = '';
        let stderr = '';

        cmd.stdout.on('data', (data) => {
            stdout += data.toString();
            console.log(`${command} ${args.join(' ')} stdout: ${data}`);
        });

        cmd.stderr.on('data', (data) => {
            stderr += data.toString();
            console.error(`${command} ${args.join(' ')} stderr: ${data}`);
        });

        cmd.on('close', (code) => {
            if (code === 0) {
                resolve({ success: true, stdout, stderr });
            } else {
                reject(new Error(`${command} ${args.join(' ')} failed with code ${code}`));
            }
        });

        cmd.on('error', (err) => {
            reject(new Error(`${command} ${args.join(' ')} encountered an error: ${err.message}`));
        });
    });
}

module.exports = runCommand;