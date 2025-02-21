CREATE TABLE IF NOT EXISTS gum_views (
    gum_id String,
    user_id String,
    timestamp DateTime,
    ip String,
    user_agent String
)
ENGINE = MergeTree()
ORDER BY (timestamp, gum_id);
