# variable "google_credentials" {
#   type = string  
# }

provider "google" {
  credentials = file("keys.json")
  project     = "united-electron-414109"
  region      = "us-central1"
}



locals {
  // Specify the path directly in the file function
  inputs = jsondecode(file("config.json"))
}

resource "google_compute_instance" "example_instance" {
  name         = local.inputs.name
  machine_type = local.inputs.machine_type
  zone         = local.inputs.zone

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