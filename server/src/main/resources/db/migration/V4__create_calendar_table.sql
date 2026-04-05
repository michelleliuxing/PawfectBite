CREATE TABLE calendar_entries (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    pet_id      UUID        NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
    recipe_id   UUID        NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
    entry_date  DATE        NOT NULL,
    meal_type   VARCHAR(50) NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_calendar_entries_user_pet_date ON calendar_entries(user_id, pet_id, entry_date);
