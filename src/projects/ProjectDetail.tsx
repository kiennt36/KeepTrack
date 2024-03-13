import { Params, useParams } from "react-router-dom";
import { Project } from "./Project";
import { useEffect, useState } from "react";
import { projectAPI } from "./projectAPI";

function ProjectDetail() {
	const params: Readonly<Params<string>> = useParams();
	const id: number = Number(params.id);

	const [project, setProject] = useState<Project | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		setLoading(true);

		async function loadProject(id: number): Promise<void> {
			try {
				const data = await projectAPI.find(id);
				setError(null);
				setProject(data);
			} catch (error: any) {
				setError(error.message);

				if (error instanceof Error) {
					setError(error.message);
				}
			} finally {
				setLoading(false);
			}
		}

		loadProject(id);
	}, [id]);

	return (
		<>
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
			{!error && !loading && project && (
				<div className="row">
					<div className="col-sm-6">
						<div className="card large">
							<img
								className="rounded"
								src={project.imageUrl}
								alt={project.name}
							/>
							<section className="section dark">
								<h3 className="strong">
									<strong>{project.name}</strong>
								</h3>
								<p>{project.description}</p>
								<p>Budget : {project.budget}</p>

								<p>
									Signed:{" "}
									{project.contractSignedOn.toLocaleDateString()}
								</p>
								<p>
									<mark className="active">
										{" "}
										{project.isActive
											? "active"
											: "inactive"}
									</mark>
								</p>
							</section>
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
}

export default ProjectDetail;
