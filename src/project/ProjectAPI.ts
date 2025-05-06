import { Project } from "./Project";
const baseUrl = "http://localhost:4000";
const url = `${baseUrl}/projects`;

function translateStatusToErrorMessage(status: number){
    switch (status) {
        //401 - unauthorized /must authenticate
        case 401:
            return "Please login again";
        //403 - Forbidden /the client dont have the right to acess this resource
        case 403:
            return "You don't have permission to view this project";
        default:
            return "There was and error retrieving the projects. Please try again";
    }
}


function checkStatus(response: any) {
    if(response.ok){
        return response;
    } else {
        const httpErrorInfo = {
            status: response.status,
            statusText: response.statusText,
            url: response.url,
          };

    console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);
    
    let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
    throw new Error(errorMessage);
    }
}

function parseJson(response: Response){
    return response.json();
}


//eslint-disable-next-line
/* function delay(ms: number) {
    return function (x: any): Promise<any> {
        return new Promise((resolve) => setTimeout(() => resolve(x), ms))
    };
} */

function convertToProjectModels(data: any[]): Project[] {
    let projects: Project[] = data.map(convertToProjectModel);
    return projects;
}

function convertToProjectModel(item: any): Project {
    return new Project(item);
}


//HTTP requests for the api
const projectAPI = {
    get(page = 1, limit = 20) {
        return fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`)
        .then(checkStatus)
        .then(parseJson)
        .then(convertToProjectModels)
        .catch((error: TypeError) => {
            console.log("log client error" + error);
            throw new Error(
                "there was an error retrieving projects"
            )
        })
    },
    //PUT ENDPOINT
    put(project: Project) {
        return fetch(`${url}/${project.id}`, {
            method: 'PUT',
            body: JSON.stringify(project),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(checkStatus)
        .then(parseJson)
        .catch((error: TypeError) => {
            console.log('log client error: ' + error);
            throw new Error (
                'There was an excpetion while updating the projects.'
            );
        });
    },

    find(id: number) {
        return fetch(`${url}/${id}`)
        .then(checkStatus)
        .then(parseJson)
        .then(convertToProjectModel)
    },


}

export { projectAPI };