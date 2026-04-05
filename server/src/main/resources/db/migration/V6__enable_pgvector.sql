CREATE EXTENSION IF NOT EXISTS vector;

ALTER TABLE ingredient_knowledge ADD COLUMN embedding vector(1536);
ALTER TABLE nutrition_guidance ADD COLUMN embedding vector(1536);

CREATE INDEX idx_ingredient_knowledge_embedding ON ingredient_knowledge
    USING ivfflat (embedding vector_cosine_ops) WITH (lists = 50);

CREATE INDEX idx_nutrition_guidance_embedding ON nutrition_guidance
    USING ivfflat (embedding vector_cosine_ops) WITH (lists = 50);
