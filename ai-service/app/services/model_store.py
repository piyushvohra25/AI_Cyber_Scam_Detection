from pathlib import Path

import joblib
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline

from app.services.url_features import extract_url_features


BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
MODEL_DIR = BASE_DIR / "models"
MODEL_DIR.mkdir(parents=True, exist_ok=True)

MESSAGE_MODEL_PATH = MODEL_DIR / "message_model.joblib"
URL_MODEL_PATH = MODEL_DIR / "url_model.joblib"


class ModelStore:
    def __init__(self) -> None:
        self.message_bundle = self._load_or_train_message_model()
        self.url_bundle = self._load_or_train_url_model()

    def _load_or_train_message_model(self) -> dict:
        if MESSAGE_MODEL_PATH.exists():
            return joblib.load(MESSAGE_MODEL_PATH)

        dataset = pd.read_csv(DATA_DIR / "message_dataset.csv")
        pipeline = Pipeline(
            [
                ("tfidf", TfidfVectorizer(stop_words="english", ngram_range=(1, 2))),
                ("classifier", LogisticRegression(max_iter=1000, random_state=42)),
            ]
        )
        pipeline.fit(dataset["text"], dataset["label"])

        bundle = {
            "pipeline": pipeline,
            "dataset": dataset.to_dict(orient="records"),
        }
        joblib.dump(bundle, MESSAGE_MODEL_PATH)
        return bundle

    def _load_or_train_url_model(self) -> dict:
        if URL_MODEL_PATH.exists():
            return joblib.load(URL_MODEL_PATH)

        dataset = pd.read_csv(DATA_DIR / "url_dataset.csv")
        feature_rows = [extract_url_features(url) for url in dataset["url"]]
        features_df = pd.DataFrame(feature_rows).drop(columns=["suspicious_keywords"])
        classifier = LogisticRegression(max_iter=1000, random_state=42)
        classifier.fit(features_df, dataset["label"])

        bundle = {
            "classifier": classifier,
            "feature_columns": list(features_df.columns),
        }
        joblib.dump(bundle, URL_MODEL_PATH)
        return bundle


model_store = ModelStore()
