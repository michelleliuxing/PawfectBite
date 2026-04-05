CREATE TABLE ingredient_knowledge (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name            VARCHAR(255)  NOT NULL,
    category        VARCHAR(100),
    species_safe    VARCHAR(10)[] NOT NULL DEFAULT '{}',
    safety_notes    TEXT,
    nutrition_info  TEXT,
    content_text    TEXT          NOT NULL,
    created_at      TIMESTAMPTZ   NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ   NOT NULL DEFAULT now()
);

CREATE INDEX idx_ingredient_knowledge_name ON ingredient_knowledge(name);

CREATE TABLE nutrition_guidance (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title           VARCHAR(500)  NOT NULL,
    category        VARCHAR(100),
    species         VARCHAR(10),
    content_text    TEXT          NOT NULL,
    source          VARCHAR(500),
    created_at      TIMESTAMPTZ   NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ   NOT NULL DEFAULT now()
);
