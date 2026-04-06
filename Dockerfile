FROM python:3.12-slim

WORKDIR /app

COPY backend ./backend
COPY frontend ./frontend

RUN pip install --no-cache-dir flask flask-cors google-cloud-bigquery

ENV PORT=8080

CMD ["python", "backend/main.py"]

