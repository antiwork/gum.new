CREATE TABLE IF NOT EXISTS gum_views (
    gum_id String,
    user_id Nullable(String),
    timestamp DateTime,
    ip Nullable(String),
    user_agent Nullable(String)
)
ENGINE = MergeTree()
ORDER BY (timestamp, gum_id);
