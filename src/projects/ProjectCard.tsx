import { Link } from "react-router-dom";
import { Project } from "./Project";

function formatDescription(description: string): string {
	return description.substring(0, 60) + "...";
}

interface ProjectCardProps {
	project: Project;
	onEdit: (project: Project) => void;
}

function ProjectCard(props: ProjectCardProps) {
	const { project, onEdit } = props;

	const handleEditClick = (projectBegingEdited: Project) => {
		onEdit(projectBegingEdited);
	};

	return (
		<div className="card">
			<Link to={`/projects/${project.id}`}>
				<img src={project.imageUrl} alt={project.name} />
			</Link>
			<section className="section dark">
				<Link to={`/projects/${project.id}`}>
					<h5 className="strong">
						<strong>{project.name}</strong>
					</h5>
				</Link>
				<p>{formatDescription(project.description)}</p>
				<p>Budget : {project.budget.toLocaleString()}</p>
				<button
					className=" bordered"
					onClick={() => {
						handleEditClick(project);
					}}
				>
					<span className="icon-edit "></span>
					Edit
				</button>
			</section>
		</div>
	);
}

export default ProjectCard;
