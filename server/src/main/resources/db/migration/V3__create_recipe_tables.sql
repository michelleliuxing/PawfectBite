CREATE TABLE recipe_requests (
    id                      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id                 UUID         NOT NULL REFERENCES users(id),
    pet_id                  UUID         NOT NULL REFERENCES pets(id),
    goal                    VARCHAR(500) NOT NULL,
    ingredients_to_include  TEXT[]       NOT NULL DEFAULT '{}',
    ingredients_to_exclude  TEXT[]       NOT NULL DEFAULT '{}',
    budget                  VARCHAR(100),
    prep_time_minutes       INT,
    risk_level              VARCHAR(10)  NOT NULL,
    safety_warnings         JSONB        NOT NULL DEFAULT '[]',
    created_at              TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX idx_recipe_requests_user_id ON recipe_requests(user_id);

CREATE TABLE recipes (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id             UUID          NOT NULL REFERENCES users(id),
    pet_id              UUID          NOT NULL REFERENCES pets(id),
    request_id          UUID          REFERENCES recipe_requests(id),
    title               VARCHAR(500)  NOT NULL,
    description         TEXT,
    ingredients         JSONB         NOT NULL DEFAULT '[]',
    steps               JSONB         NOT NULL DEFAULT '[]',
    estimated_calories  INT,
    feeding_portions    TEXT,
    shopping_list       JSONB         NOT NULL DEFAULT '[]',
    prep_time_minutes   INT,
    storage_guidance    TEXT,
    caution_notes       JSONB         NOT NULL DEFAULT '[]',
    risk_level          VARCHAR(10)   NOT NULL,
    warnings            JSONB         NOT NULL DEFAULT '[]',
    status              VARCHAR(20)   NOT NULL DEFAULT 'DRAFT',
    created_at          TIMESTAMPTZ   NOT NULL DEFAULT now(),
    updated_at          TIMESTAMPTZ   NOT NULL DEFAULT now()
);

CREATE INDEX idx_recipes_user_id ON recipes(user_id);
CREATE INDEX idx_recipes_pet_id ON recipes(pet_id);
CREATE INDEX idx_recipes_status ON recipes(status);
