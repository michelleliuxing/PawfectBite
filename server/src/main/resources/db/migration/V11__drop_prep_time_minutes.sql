ALTER TABLE recipes DROP COLUMN IF EXISTS prep_time_minutes;
ALTER TABLE recipe_requests DROP COLUMN IF EXISTS prep_time_minutes;
ALTER TABLE recipe_requests DROP COLUMN IF EXISTS budget;
