from fastapi.testclient import TestClient
from app.main import app

def test_health_and_model_info():
    with TestClient(app) as client:
        health = client.get('/api/v1/health')
        assert health.status_code == 200
        assert health.json()['status'] == 'ok'
        model = client.get('/api/v1/model')
        assert model.status_code == 200
        assert len(model.json()['classes']) == 9

def test_ready_shape():
    with TestClient(app) as client:
        data = client.get('/api/v1/ready').json()
        assert isinstance(data['ready'], bool)
        assert 'error' in data
