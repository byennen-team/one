#!/bin/bash

# Exit on first command that fails
set -e

jshint .
meteor run --test --once --settings settings.development.json
