#!/bin/sh

# This script compiles the TypeScript solution function to JavaScript and pipes in the provided input (sample cases). It generates a js solution file to submit as a solution + a sample case output .txt file.

npx tsc parcels.ts --target "es2019" --module "commonjs" --removeComments

node parcels.js < ./kickstart-IO/parcels_sample_ts1_input.txt > generated-output.txt
