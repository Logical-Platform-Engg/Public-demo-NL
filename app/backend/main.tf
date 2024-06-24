# variable "google_credentials" {
#   type = string  
# }

provider "google" {
  credentials = file("keys.json")
  project     = "nlpe1-427015"
  region      = "us-central1"
}



variable "terraform_data" {
  type = string
}

locals {
  decoded_data = jsondecode(var.terraform_data)
}

resource "google_compute_instance" "example_instance" {
  name         = local.decoded_data["name"]
  machine_type = local.decoded_data["machine_type"]
  zone         = local.decoded_data["zone"]
  metadata = {
    owner = local.decoded_data["owner"]
  }
  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-10"  // Hardcoded boot disk image
    }
  }

  network_interface {
    network = "default"                 // Hardcoded network
    access_config {}
  }
}