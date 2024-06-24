provider "google" {
  credentials = file("keys.json")
  project     = "${var.project_id}"
  region      = "us-central1"
  zone        = "us-central1-a"
}

terraform {
  backend "gcs" {
    bucket  = "demo-nlpe1"
    prefix  = "nlpe1-infra/state"
  }
}

resource "null_resource" "build_and_push_backend" {
  provisioner "local-exec" {
    command = "bash ${path.module}/build_backend.sh"
  }
}

resource "google_cloud_run_service" "frontend" {
  name     = "frontend-service"
  location = var.region

  template {
    spec {
      containers {
        image = "gcr.io/${var.project_id}/frontend-image"

        # Define the port for the container
        ports {
          container_port = 3000  # Adjust the port as needed
        }
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

  depends_on = [null_resource.build_and_push_backend]

  template {
    spec {
      containers {
        image = "gcr.io/${var.project_id}/backend-image"
      # Define the port for the container
        ports {
          container_port = 5000  # Adjust the port as needed
        }
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
  
  provisioner "local-exec" {
    command = "bash ${path.module}/build_frontend.sh"
    environment = {
      BACKEND_URL = google_cloud_run_service.backend.status[0].url
      path_to_frontend = "${path.module}/../app/frontend"
    }
  }
}



output "frontend_url" {
  value = google_cloud_run_service.frontend.status[0].url
}

output "backend_url" {
  value = google_cloud_run_service.backend.status[0].url
}

