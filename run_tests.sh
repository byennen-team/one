#!/bin//bash

jshint .
meteor run --test --once --settings settings.staging.json
