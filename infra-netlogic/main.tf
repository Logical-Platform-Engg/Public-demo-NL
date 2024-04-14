provider "google" {
  project     = "${var.project_id}"
  region      = "us-central1"
  zone        = "us-central1-a"
}


resource "google_cloud_run_service" "frontend" {
  name     = "frontend-service"
  location = var.region

  template {
    spec {
      containers {
        image = "gcr.io/${var.project_id}/frontend-image"

        env {
          name  = "REACT_APP_BACKEND_URL"
          value = google_cloud_run_service.backend.status[0].url
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

resource "google_cloud_run_service" "backend" {
  name     = "backend-service"
  location = var.region

  template {
    spec {
      containers {
        image = "gcr.io/${var.project_id}/backend-image"

      }
    }

    metadata {
      namespace = "cloud-run"
      annotations = {
        "autoscaling.knative.dev/maxScale" = "2"  # Adjust as needed
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}



output "frontend_url" {
  value = google_cloud_run_service.frontend.status[0].url
}
