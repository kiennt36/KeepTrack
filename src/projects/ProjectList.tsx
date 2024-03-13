import { useState } from "react";
import { Project } from "./Project";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

interface ProjectListProps {
	projects: Project[];
	onSave: (project: Project) => void;
}

function ProjectList({ projects, onSave }: ProjectListProps) {
	const [projectBegingEdited, setProjectBegingEdited] = useState({});

	const handleEdit = (project: Project) => {
		setProjectBegingEdited(project);
	};

	const cancelEditting = () => {
		setProjectBegingEdited({});
	};

	const items = projects.map((project: Project) => (
		<div key={project.id} className="cols-sm">
			{project === projectBegingEdited ? (
				<ProjectForm
					project={project}
					onSave={onSave}
					onCancel={cancelEditting}
				/>
			) : (
				<ProjectCard project={project} onEdit={handleEdit} />
			)}
		</div>
	));

	return <div className="row">{items}</div>;
}

export default ProjectList;
