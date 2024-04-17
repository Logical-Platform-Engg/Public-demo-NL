variable "google_credentials" {
  type = string  
}

variable "project" {}

provider "google" {
  credentials = var.google_credentials
  project     = var.project
  region      = "us-central1"
}
//test again
terraform {
  backend "gcs" {
    bucket = "my-project-bucket-test-test"
    prefix = "tf-demo/workspace"
  }
}

# Define resources
resource "google_storage_bucket" "example_bucket" {
  name          = "example-bucket-netlogic-test"
  location      = "US"
  force_destroy = true
}
