provider "aws"{
    region = "us-east-1"
}

resource "aws_s3_bucket" "my_bucket" {
    bucket = "name-group-bucket-999"
    
}