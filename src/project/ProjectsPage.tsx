//import { MOCK_PROJECTS } from "./MockProjects";
import ProjectList from "./ProjectList";
import { useProjects } from "./ProjectHooks";

function ProjectsPage(){
    const {
        projects,
        loading,
        error,
        setCurrentPage,
        saveProject,
        saving,
        savingError,
    } = useProjects();
    

    const handleMoreClick = () => {
        setCurrentPage((currentPage) => currentPage + 1);
    };

    

    return <>
        <h1>Projects</h1>
        {saving && <span className="toast">Saving...</span>}
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
        {savingError && (
            <div className="card large error">
                <section>
                    <p>
                        <span className="icon-alert inverse"></span>
                        {savingError}
                    </p>
                </section>
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