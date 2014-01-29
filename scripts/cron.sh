#!/bin/sh

RUNDIR=$(pwd)
BASEDIR=$(dirname $0)

NODE_ENV="production"

export NODE_ENV=$NODE_ENV

cd $BASEDIR

../cron.js > ../cron.log 2>&1

cd $RUNDIR
