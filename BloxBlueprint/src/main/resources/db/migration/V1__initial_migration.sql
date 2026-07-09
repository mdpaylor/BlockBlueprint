CREATE TABLE IF NOT EXISTS users
(
	id BIGSERIAL PRIMARY KEY,
	username VARCHAR(255) NOT NULL,
	first_name VARCHAR(255) NOT NULL,
	last_name VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL UNIQUE,
	phone_number VARCHAR(16),
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS experiences
(
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	description TEXT,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP,
	user_id BIGINT NOT NULL,
	
	CONSTRAINT fk_experiences_user
		FOREIGN KEY(user_id)
		REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS components
(
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	description TEXT,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP,
	c_type VARCHAR(255),
	experience_id BIGINT NOT NULL,
	parent_component_id BIGINT,
	
	CONSTRAINT fk_experience
		FOREIGN KEY(experience_id)
		REFERENCES experiences(id),

	CONSTRAINT fk_parent_component
		FOREIGN KEY(parent_component_id)
		REFERENCES components(id),

	CONSTRAINT chk_not_self_parent
		CHECK (parent_component_id IS NULL OR parent_component_id <> id)
);

CREATE TABLE IF NOT EXISTS component_functions
(
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	description TEXT,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP,
	component_id BIGINT NOT NULL,
	parent_function_id BIGINT,
	
	CONSTRAINT fk_component
		FOREIGN KEY(component_id)
		REFERENCES components(id),

	CONSTRAINT fk_parent_function
		FOREIGN KEY(parent_function_id)
		REFERENCES component_functions(id)
);

CREATE TABLE IF NOT EXISTS updates
(
	id BIGSERIAL PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	description TEXT,
	u_version VARCHAR(20) NOT NULL,
	release_date DATE,
	status varchar(11) NOT NULL DEFAULT 'PLANNING',
	experience_id BIGINT,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP,

	CONSTRAINT fk_experience
		FOREIGN KEY(experience_id)
		REFERENCES experiences(id),

	CONSTRAINT validate_status
		CHECK (status in ('PLANNING', 'IN_PROGRESS', 'RELEASED'))
);

CREATE TABLE IF NOT EXISTS tasks
(
	id BIGSERIAL PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	description TEXT,
	estimated_hours NUMERIC(5,1),
	completed_hours NUMERIC(5,1),
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP,
	due_date DATE,
	completed_date DATE,
	priority VARCHAR(8) NOT NULL DEFAULT 'LOW',
	status VARCHAR(11) NOT NULL DEFAULT 'TODO',
	experience_id BIGINT NOT NULL,
	update_id BIGINT,

	CONSTRAINT fk_experience
		FOREIGN KEY(experience_id)
		REFERENCES experiences(id),

	CONSTRAINT fk_update
		FOREIGN KEY (update_id)
		REFERENCES updates(id),

	CONSTRAINT validate_priority
		CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
	CONSTRAINT validate_status
		CHECK (status IN ('BACKLOG', 'TODO', 'IN_PROGRESS', 'COMPLETED', 'BLOCKED'))
);

CREATE TABLE IF NOT EXISTS monetizations
(
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(255),
	description TEXT,
	m_type VARCHAR(17) NOT NULL DEFAULT 'GAMEPASS',
	price INT NOT NULL DEFAULT 0,
	experience_id BIGINT NOT NULL,
	component_id BIGINT,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP,
	status VARCHAR(20) NOT NULL DEFAULT 'IDEA',

	CONSTRAINT fk_project
		FOREIGN KEY(experience_id)
		REFERENCES experiences(id),

	CONSTRAINT fk_component
		FOREIGN KEY(component_id)
		REFERENCES components(id),

	CONSTRAINT validate_m_type
		CHECK(m_type IN ('GAMEPASS', 'DEVELOPER_PRODUCT')),

	CONSTRAINT chk_monetization_status
		CHECK (status IN ( 'IDEA', 'IN_DEVELOPMENT', 'READY', 'LIVE', 'PAUSED'))
);

CREATE TABLE IF NOT EXISTS tags
(
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	color VARCHAR(7) NOT NULL DEFAULT '#FFFFFF',
	description TEXT,
	user_id BIGINT NOT NULL,

	CONSTRAINT fk_tags_user
		FOREIGN KEY(user_id)
		REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS task_tags
(
	task_id BIGINT NOT NULL,
	tag_id BIGINT NOT NULL,

	PRIMARY KEY (task_id, tag_id),

	CONSTRAINT task
		FOREIGN KEY(task_id)
		REFERENCES tasks(id),

	CONSTRAINT tag
		FOREIGN KEY(tag_id)
		REFERENCES tags(id)
);

CREATE TABLE IF NOT EXISTS component_tags
(
	component_id BIGINT NOT NULL,
	tag_id BIGINT NOT NULL,

	PRIMARY KEY (component_id, tag_id),

	CONSTRAINT component
		FOREIGN KEY(component_id)
		REFERENCES components(id),

	CONSTRAINT tag
		FOREIGN KEY(tag_id)
		REFERENCES tags(id)
);

CREATE TABLE IF NOT EXISTS component_links
(
	id BIGSERIAL PRIMARY KEY,
	from_component_id BIGINT NOT NULL,
	to_component_id BIGINT NOT NULL,
	relationship_type VARCHAR(10) NOT NULL DEFAULT 'USES',

	CONSTRAINT fk_from_component
		FOREIGN KEY(from_component_id)
		REFERENCES components(id),

	CONSTRAINT fk_to_component
		FOREIGN KEY(to_component_id)
		REFERENCES components(id),

	CONSTRAINT validate_relationship_type
		CHECK(relationship_type IN ('USES','CALLS','REQUIRES', 'PARENTS', 'REFERENCES'))
);

CREATE TABLE IF NOT EXISTS notes
(
	id BIGSERIAL PRIMARY KEY,
	title VARCHAR(255),
	content TEXT,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP,
	experience_id BIGINT NOT NULL,
	component_id BIGINT,
	task_id BIGINT,

	CONSTRAINT fk_experience
		FOREIGN KEY(experience_id)
		REFERENCES experiences(id),
		
	CONSTRAINT fk_component
		FOREIGN KEY(component_id)
		REFERENCES components(id),
		
	CONSTRAINT fk_task
		FOREIGN KEY(task_id)
		REFERENCES tasks(id),

	CONSTRAINT uq_note_component
		UNIQUE (component_id),

	CONSTRAINT uq_note_task
		UNIQUE (task_id)
);