import { useEffect, useState } from "react";
import { Project } from "./Project";
import ProjectList from "./ProjectList";
import { projectAPI } from "./projectAPI";

const ProjectsPage = () => {
	const [projects, setProjects] = useState<Project[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [currentPage, setCurrentPage] = useState<number>(1);

	useEffect(() => {
		setLoading(true);

		// projectAPI
		// 	.get(1)
		// 	.then((data: Project[]) => {
		// 		setError(null);
		// 		setProjects(data);
		// 	})
		// 	.catch((err: any) => {
		// 		setError(err.message);

		// 		if(err instanceof Error) {
		// 			setError(err.message)
		// 		}
		// 	})
		// 	.finally(() => {
		// 		setLoading(false);
		// 	});

		async function loadProjects(): Promise<void> {
			setLoading(true);

			try {
				const data: Project[] = await projectAPI.get(currentPage);
				setError(null);

				if (currentPage === 1) {
					setProjects(data);
				} else {
					setProjects((projects: Project[]) => [
						...projects,
						...data,
					]);
				}
			} catch (error: any) {
				if (error instanceof Error) {
					setError(error.message);
				}
			} finally {
				setLoading(false);
			}
		}

		loadProjects();
	}, [currentPage]);

	const saveProject = (project: Project) => {
		projectAPI
			.put(project)
			.then((updatedProject: Project) => {
				let updatedProjects = projects.map((p: Project) => {
					return p.id === updatedProject.id ? updatedProject : p;
				});
				setProjects(updatedProjects);
			})
			.catch((error: any) => {
				if (error instanceof Error) {
					setError(error.message);
				}
			});
	};

	const handleMoreClick = () => {
		setCurrentPage((currentPage: number) => currentPage + 1);
	};

	return (
		<>
			<h1>Projects</h1>

			{error && (
				<div className="row">
					<div className="card large error">
						<section>
							<p>
								<span className="icon-alert inverse"></span>
								{error}
							</p>
						</section>
					</div>
				</div>
			)}

			<ProjectList projects={projects} onSave={saveProject} />

			{!loading && !error && (
				<div className="row">
					<div className="col-sm-12">
						<div className="button-group fluid">
							<button
								className="button default"
								onClick={handleMoreClick}
							>
								More...
							</button>
						</div>
					</div>
				</div>
			)}

			{loading && (
				<div className="center-page">
					<span className="spinner primary"></span>
					<p>Loading...</p>
				</div>
			)}
		</>
	);
};

export default ProjectsPage;
