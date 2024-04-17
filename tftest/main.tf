variable "google_credentials" {
  type = string  
}

variable "project" {}

provider "google" {
  credentials = var.google_credentials
  project     = var.project
  region      = "us-central1"
}

# Define resources
resource "google_storage_bucket" "example_bucket" {
  name          = "example-bucket-netlogic"
  location      = "US"
  force_destroy = true
}
