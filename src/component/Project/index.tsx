import { FC } from 'react'
import { Button, Card } from 'antd'
import { ProjectModel } from '../../model/Project'

interface ProjectProps {
  project: ProjectModel
  onChange: (value: string) => void
  onUpdate: () => void
  onDelete: () => void
  onEdit: () => void
  onEditMode: boolean
}

const Project: FC<ProjectProps> = ({ project, onChange, onUpdate, onDelete, onEdit, onEditMode }) => {
  return (
    <Card.Grid className="projects">
      <div className="project">
        {onEditMode ? (
          <input
            className="edit-mode"
            value={project.name}
            placeholder={project.name}
            type="text"
            onChange={(e) => onChange(e.target.value)}
          />
        ) : (
          <div>{project.name}</div>
        )}
      </div>
      <div>
        {onEditMode ? (
          <>
            <Button className="edit-btn" onClick={onUpdate}>
              Update
            </Button>
            <Button className="delete-btn" onClick={onDelete}>
              Delete
            </Button>
          </>
        ) : (
          <Button className="edit-btn" onClick={onEdit}>
            Edit
          </Button>
        )}
      </div>
    </Card.Grid>
  )
}

export default Project
