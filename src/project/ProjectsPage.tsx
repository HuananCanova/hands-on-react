import { useEffect, useState } from "react";
//import { MOCK_PROJECTS } from "./MockProjects";
import { Project } from "./Project";
import ProjectList from "./ProjectList";
import { projectAPI } from "./ProjectAPI";

function ProjectsPage(){

    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState(1);

    const handleMoreClick = () => {
        setCurrentPage((currentPage) => currentPage + 1);
    };

   const saveProject = (project: Project) => {
        projectAPI
            .put(project)
            .then((updatedProject) => {
                let updatedProjects = projects.map((p: Project) => {
                    return p.id===project.id ? new Project(updatedProject) : p;
                });
                setProjects(updatedProjects);
            })
            .catch((e) => {
                if (e instanceof Error) {
                    setError(e.message);
                }
            });
    }

    useEffect(() => {
        async function loadProjects() {
            setLoading(true);
            try {
                const data = await projectAPI.get(currentPage);
                setError("");
                if(currentPage === 1) {
                    setProjects(data);
                } else {
                    setProjects((projects) => [...projects, ...data]);
                }
            } catch (e) {
                if (e instanceof Error) {
                    setError(e.message);
                }

            } finally {
                setLoading(false);
            }
        }
        loadProjects();
    }, [currentPage]);
    

    return <>
        <h1>Projects</h1>
        {error && (
        <div className="row">
            <div className="card large error">
                <section>
                <p> 
                    <span className="icon-alert inverse "></span>
                    {error}
                </p>
                </section>
            </div>
        </div>
        )}
        <ProjectList onSave={saveProject} projects={projects} />
            {!loading && !error && (
                <div className="row">
                    <div className="col-sm-12">
                        <div className="button-group ">
                            <button className="button default" onClick={handleMoreClick}>
                                More...
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            {loading && (
                <div className="center-page">
                    <span className="center-page">
                        <p>Loading...</p>
                    </span>
                </div>
            )}
        </>
}

export default ProjectsPage;