import { useEffect, useState } from "react";
import { Project } from "./Project";
import { useParams } from "react-router-dom";
import { projectAPI } from "./ProjectAPI";
import ProjectDetails from "./ProjectDetails";

function ProjectPage(){
    const [loading, setLoading] = useState(false);
    const [project, setProject] = useState<Project | null>(null);
    const [error, setError] = useState<string | null>(null);
    const params = useParams();
    const id = Number(params.id);


    useEffect(() => {
        setLoading(true)
        projectAPI
        .find(id)
        .then((data) => {
            setProject(data);
            setLoading(false);
        })
        .catch((e) => {
            setError(e);
            setLoading(false);
        });
    }, [id]);

    return (
        <div>
            <>
            <h1>Project Detail</h1>
            {loading && (
                <div className="center-page">
                    <span className="spinner primary"></span>
                    <p>Loading...</p>
                </div>
            )}
            <div className="row">
                {error && (
                    <div className="card large error">
                        <section>
                            <p>
                                <span className="icon-alert inverse"></span> {error}
                            </p>
                        </section>
                    </div>
                )}
            </div>
            {project && <ProjectDetails project={project}/>}
            </>
        </div>
    )
}
export default ProjectPage;