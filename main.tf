variable "google_credentials" {
  type = string  
}

variable "project" {}

provider "google" {
  credentials = var.google_credentials
  project     = var.project
  region      = "us-central1"
}

# Configure Terraform backend to store state file in the existing Google Cloud Storage bucket
terraform {
  backend "gcs" {
    bucket  = "my-project-bucket-test-test"  
    prefix  = "terraform/state"   
  }
}

# Define resources
resource "google_storage_bucket" "example_bucket" {
  name          = "example-bucket-netlogic"
  location      = "US"
  force_destroy = true
}
