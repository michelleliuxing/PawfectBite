CREATE TABLE pets (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id             UUID         NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name                VARCHAR(100) NOT NULL,
    species             VARCHAR(10)  NOT NULL CHECK (species IN ('DOG', 'CAT')),
    breed               VARCHAR(100) NOT NULL,
    age_years           INT          NOT NULL DEFAULT 0,
    age_months          INT          NOT NULL DEFAULT 0,
    sex                 VARCHAR(10)  NOT NULL CHECK (sex IN ('MALE', 'FEMALE')),
    is_neutered         BOOLEAN      NOT NULL DEFAULT false,
    weight_kg           DECIMAL(6,2) NOT NULL,
    target_weight_kg    DECIMAL(6,2),
    activity_level      VARCHAR(20)  NOT NULL CHECK (activity_level IN ('LOW', 'MODERATE', 'HIGH', 'VERY_HIGH')),
    living_environment  VARCHAR(10)  NOT NULL CHECK (living_environment IN ('INDOOR', 'OUTDOOR', 'BOTH')),
    health_goal         VARCHAR(500),
    current_diet        VARCHAR(500),
    feeding_frequency   INT          NOT NULL DEFAULT 2,
    created_at          TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at          TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX idx_pets_user_id ON pets(user_id);

CREATE TABLE pet_allergies (
    id      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pet_id  UUID         NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
    name    VARCHAR(255) NOT NULL
);

CREATE INDEX idx_pet_allergies_pet_id ON pet_allergies(pet_id);

CREATE TABLE pet_medical_conditions (
    id      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pet_id  UUID         NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
    name    VARCHAR(255) NOT NULL
);

CREATE INDEX idx_pet_medical_conditions_pet_id ON pet_medical_conditions(pet_id);

CREATE TABLE pet_medications (
    id      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pet_id  UUID         NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
    name    VARCHAR(255) NOT NULL
);

CREATE INDEX idx_pet_medications_pet_id ON pet_medications(pet_id);
