#!/bin//bash

jshint .
VELOCITY_DEBUG=1 meteor run --test --once --settings settings.staging.json
