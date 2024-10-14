#!/bin/bash

# Specify key length
KEY_SIZE=2048

# Specify output file names
PRIVATE_KEY="private.key"
PUBLIC_KEY="public.key"

# Check if openssl is installed
if ! command -v openssl &> /dev/null
then
    echo "openssl is not installed. Please install openssl first."
    exit
fi

# Generate private key
openssl genrsa -out $PRIVATE_KEY $KEY_SIZE

# Generate public key
openssl rsa -in $PRIVATE_KEY -pubout -out $PUBLIC_KEY

# Output the paths of the generated keys
echo "Private key stored at: $(pwd)/$PRIVATE_KEY"
echo "Public key stored at: $(pwd)/$PUBLIC_KEY"
